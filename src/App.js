import React, { Component } from 'react'

import './App.css'
import '@blueprintjs/core/dist/blueprint.css'

import {
  NonIdealState
} from '@blueprintjs/core'

const Navbar = () => (
  <nav className='pt-navbar pt-dark'>
    <div className='pt-navbar-group pt-align-left'>
      <div className='pt-navbar-heading'>Blunder Repos Club</div>
    </div>
    <div className='pt-navbar-group pt-align-right'>
      <button className='pt-button pt-minimal pt-icon-user'>Logout</button>
    </div>
  </nav>
)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navbar />
        <NonIdealState
          className='Empty'
          visual={<span style={{fontSize: '6em'}} className='pt-icon pt-icon-git-repo' />}
          title='No repositories have been loaded'
          description='In order to show your repositories, you need to authenticate through Github'
        />
      </div>
    )
  }
}

export default App
