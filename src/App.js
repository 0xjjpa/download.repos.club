import React, { Component } from 'react'
import axios from 'axios'
import Maybe from 'data.maybe'

import './App.css'
import '@blueprintjs/core/dist/blueprint.css'

import {
  NonIdealState
} from '@blueprintjs/core'

const api = {
  getRepos: () => axios.get('https://api.github.com/users/d3/repos')
}

const Repo = ({name}) => (
  <div className='pt-card pt-elevation-3'>
    <div className='Repo'>
      <div className='Repo__container'>
        <div className='Repo__headline-container'>
          <span className='Repo__name'>
            <span className='pt-icon-standard pt-icon-git-repo' />
            {name}
          </span>
          <span className='Repo__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec dapibus et mauris, vitae dictum metus.</span>
        </div>
        <div className='Repo__metadata-container'>
          <span className='Repo__stars'>421 stars</span>
          <span className='Repo__forks'>12 forks</span>
        </div>
      </div>
      <div className='Repo__container'>
        <span className='Repo__latest-commit'>Date</span>
        <div className='Repo__actions-container'>
          <button> Archive on Dropbox </button>
          <button> Delete Github Repo </button>
        </div>
      </div>
    </div>
  </div>
)

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
  async componentDidMount () {
    try {
      const repos = await api.getRepos()
      this.setState({ reposData: Maybe.Just(repos.data), loaded: true })
    } catch (err) {
      console.log('Error loading repositories', err)
    }
  }
  constructor (props) {
    super(props)
    this.state = { loaded: false, reposData: Maybe.Nothing() }
  }
  render () {
    const { loaded, reposData } = this.state
    const repos = reposData.chain(repos =>
      repos.map((repo, i) => <Repo key={i} name={repo.name} />
    ))
    return (
      <div className='App'>
        <Navbar />
        <div className='Container'>
          {
            loaded
            ? repos
            : <NonIdealState
              className='Empty'
              visual={<span style={{fontSize: '6em'}} className='pt-icon pt-icon-git-repo' />}
              title='No repositories have been loaded'
              description='In order to show your repositories, you need to authenticate through Github'
            />
          }
        </div>
      </div>
    )
  }
}

export default App
