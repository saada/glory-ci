import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Script from './Script'
import WebSocket from 'reconnecting-websocket'

const RunButton = styled.button`
  background-color: tomato;
`

const AppContainer = styled.div`
  font-family: sans-serif;
  font-size: 14pt;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '#!/bin/bash\necho hello, glory',
      ws: new WebSocket('ws://localhost:8000/ws')
    }
  }

  componentDidMount () {
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
  }

  handleMessage (msg) {
    console.log('msg', msg)
  }

  run () {
    console.log('running job')
    const { ws, code } = this.state
    ws.send(JSON.stringify({code}))
  }

  render () {
    console.log('---GLORY CI---')

    return <AppContainer>
      <h1>Glory CI</h1>
      <Script onChange={code => this.setState({code})} {...this.state} />
      <button>+</button>
      <RunButton onClick={e => this.run()}>Run Job</RunButton>
    </AppContainer>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
