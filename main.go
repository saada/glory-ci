package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/urfave/negroni"
)

const PORT = "8000"

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type WebsocketPayload struct {
	Code   string `json:"code"`
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer ws.Close()

	for {
		_, msg, err := ws.ReadMessage()

		if err != nil {
			fmt.Println(err)
			return
		}

		if msg == nil {
			return
		}

		payload := WebsocketPayload{}
		json.Unmarshal(msg, &payload)
		fmt.Println("running: " + payload.Code)

		run(ws, []byte(payload.Code))
	}
}

func run(ws *websocket.Conn, c []byte) {
	cmd := exec.Command("docker", "run", "--rm", "busybox", "sh", "-c", string(c))
	stdout, _ := cmd.StdoutPipe()
	stdoutReader := bufio.NewReader(stdout)
	stderr, _ := cmd.StderrPipe()
	stderrReader := bufio.NewReader(stderr)

	err := cmd.Start()

	for {
		stdoutLine, stdoutErr := stdoutReader.ReadString('\n')
		stderrLine, stderrErr := stderrReader.ReadString('\n')

		// break the loop if there's neither stdout nor stderr output
		if stdoutErr != nil && stderrErr != nil {
			break
		}

		// send payload
		payload := WebsocketPayload{string(c), stdoutLine, stderrLine}
		ws.WriteJSON(payload)
	}

	cmd.Wait()

	if err != nil {
		log.Print(err)
	}
}

func main() {
	fmt.Printf("Starting server on port %s...", PORT)
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", serveWs)

	n := negroni.Classic() // Includes some default middlewares
	n.Use(negroni.NewStatic(http.Dir("static")))
	n.UseHandler(mux)

	log.Fatal(http.ListenAndServe(":"+PORT, n))
}
