import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import '@blueprintjs/core/dist/blueprint.css'
import {
    Button,
    Menu,
    MenuItem,
    MenuDivider,
    Popover,
    Position
} from '@blueprintjs/core'

const menu = (
  <Menu>
    <MenuItem text='New' />
    <MenuItem text='Open' />
    <MenuItem text='Save' />
    <MenuDivider />
    <MenuItem text='Settings...' />
  </Menu>
)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Popover content={menu} position={Position.BOTTOM_RIGHT}>
          <Button text='Actions' />
        </Popover>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
