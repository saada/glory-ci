package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/urfave/negroni"
)

const PORT = "8000"

func main() {
	fmt.Println("Starting server...")
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "Hey there")
	})

	n := negroni.Classic() // Includes some default middlewares
	n.Use(negroni.NewStatic(http.Dir("static")))
	n.UseHandler(mux)

	log.Fatal(http.ListenAndServe(":"+PORT, n))
	// attachHandlers()
	// fmt.Println("Starting server at port " + PORT)

	// log.Fatal(http.ListenAndServe(":"+PORT, nil))
}
