import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Script from './Script'
import WebSocket from 'reconnecting-websocket'

const Column = styled.div`
  flex-direction: 'column';
  flex: 1;
`

const RunButton = styled.button`
  background-color: tomato;
`

const AppContainer = styled.div`
  font-family: sans-serif;
  font-size: 14pt;
  display: flex;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '#!/bin/bash\necho hello, glory',
      ws: new WebSocket('ws://localhost:8000/ws'),
      output: ''
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
      output: this.state.output + inputPayload.stdout + inputPayload.stderr
    })
  }

  run () {
    this.setState({output: ''})
    console.log('running job')
    const { ws, code } = this.state
    ws.send(JSON.stringify({code}))
  }

  render () {
    return <AppContainer>
      <h1>Glory CI</h1>
      <Column>
        <Script onChange={code => this.setState({code})} {...this.state} />
        <button>+</button>
        <RunButton onClick={e => this.run()}>Run Job</RunButton>
      </Column>
      <Column>
        <h2>Output</h2>
        <pre>{this.state.output}</pre>
      </Column>
    </AppContainer>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
