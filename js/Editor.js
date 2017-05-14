import React, { Component } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/sh'
import 'brace/theme/monokai'

export default class Editor extends Component {
  render () {
    return <AceEditor
      mode='sh'
      theme='monokai'
      onChange={this.props.onChange}
      name='ace'
      defaultValue='#!/bin/bash'
      value={this.props.code}
      style={{
        fontSize: '12pt'
      }}
      editorProps={{
        $blockScrolling: true
      }}
    />
  }
}
