import React, { Component } from 'react'
import axios from 'axios'
import Maybe from 'data.maybe'

import {Repo} from './Repo'
import {Navbar} from './Navbar'
import {Empty} from './Empty'

import Auth from './Auth'

import './App.css'
import '@blueprintjs/core/dist/blueprint.css'

class Api {
  constructor () {
    this.auth = new Auth('xRTGXVGR03uOlQMRds6ZpU0fx8OjLakE', 'jjperezaguinaga.auth0.com')
  }
  getRepos () {
    return this.auth.loggedIn()
    ? axios.get('https://api.github.com/user/repos?per_page=100&sort=updated')
    : Promise.reject(new Error('User is not authenticated'))
  }
}
const api = new Api()


class App extends Component {
  async componentDidMount () {
    try {
      const repos = await api.getRepos()
      this.setState({
        reposData: repos.data.length ? Maybe.Just(repos.data) : Maybe.Nothing(),
        loaded: true
      })
    } catch (err) {
      console.error('Error loading repositories', err)
    }
  }
  constructor (props) {
    super(props)
    this.state = { loaded: false, reposData: Maybe.Nothing() }
  }
  render () {
    const { loaded, reposData } = this.state
    const repos = reposData.isJust ? reposData.chain(repos =>
      repos.map((repo, i) =>
        <Repo
          key={i}
          name={repo.name}
          description={repo.description}
          stars={repo.stargazers_count}
          forks={repo.forks_count}
          updatedAt={repo.updated_at}
          forked={repo.fork}
          disabled={i < 10}
        />
    )) : (<Empty
      title='No repositories found'
      description='We couldn’t found any repositories, please try with other user'
    />)
    return (
      <div className='App'>
        <Navbar loaded={loaded} />
        <div className='Container'>
          {
            loaded
            ? repos
            : <Empty />
          }
        </div>
      </div>
    )
  }
}

export default App
