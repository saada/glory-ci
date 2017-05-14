import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Script from './Script'
import WebSocket from 'reconnecting-websocket'
import Convert from 'ansi-to-html'
const convert = new Convert()

const Column = styled.div`
  flex-direction: 'column';
  flex: 1;
`

const RunButton = styled.button`
  background-color: tomato;
  font-size: 12pt;
`

const AppContainer = styled.div`
  font-family: Menlo;
  font-size: 12pt;
  display: flex;
  margin: 0 10px;
`

const OutputContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 80vh;
  max-height: 80vh;
  max-width: 50vw;
  flex-basis: auto; /* default value */
  flex-grow: 1;
  white-space: pre-wrap;
  padding: 5px;
  overflow-y: scroll;
`

const ErrorOutput = styled.span`
  color: red
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '#!/bin/bash\necho hello, glory',
      ws: new WebSocket('ws://localhost:8000/ws'),
      outputs: []
    }
  }

  componentDidMount () {
    console.log('---GLORY CI---')

    const { ws } = this.state
    ws.addEventListener('open', () => {
      console.info('Websocket connected')
      this.setState({err: null})
    })
    ws.onerror = (err) => {
      if (err.code === 'EHOSTDOWN') {
        console.info('server down')
      }
    }
    ws.onmessage = event => {
      this.handleMessage(event.data)
    }
    ws.onclose = () => {
      console.info('Websocket disconnected')
      this.setState({err: 'Could not connect to server'})
    }

    // keyboard events
    window.document.addEventListener('keydown', e => {
      // ctrl+enter || cmd+enter
      if (e.keyCode === 13) {
        if (e.ctrlKey || e.metaKey) {
          this.run()
        }
      }
    })
  }

  handleMessage (msg) {
    const inputPayload = JSON.parse(msg)
    console.log('msg -', inputPayload)
    this.setState({
      outputs: [
        ...this.state.outputs,
        <span
          key={Math.random()}
          dangerouslySetInnerHTML={{__html: convert.toHtml(inputPayload.stdout)}} 
        />,
        inputPayload.stderr ? <ErrorOutput
          key={Math.random()}
          dangerouslySetInnerHTML={{__html: convert.toHtml(inputPayload.stderr)}}
        /> : null
      ]
    })
  }

  run () {
    this.setState({outputs: []})
    console.log('running job')
    const { ws, code } = this.state
    ws.send(JSON.stringify({code}))
  }

  render () {
    return <AppContainer>
      <Column>
        <h1>Glory CI</h1>
        <Script onChange={code => this.setState({code})} {...this.state} />
        <button>+</button>
        <RunButton onClick={e => this.run()}>Run Job</RunButton>
      </Column>
      <Column>
        <h2>Output</h2>
        <OutputContainer>
          {this.state.outputs}
        </OutputContainer>
      </Column>
    </AppContainer>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
