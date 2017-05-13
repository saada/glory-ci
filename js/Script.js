import React, { Component } from 'react'
import Editor from './Editor'

export default class Script extends Component {
  render () {
    return <Editor {...this.props} />
  }
}
