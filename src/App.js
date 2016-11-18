import React, { Component } from 'react'

import Maybe from 'data.maybe'

import {Repo} from './Repo'
import {Navbar} from './Navbar'
import {Empty} from './Empty'

import Api from './Api'

import './App.css'
import '@blueprintjs/core/dist/blueprint.css'


const initialState = { loggedIn: false, reposData: Maybe.Nothing(), profile: null }

class App extends Component {
  componentDidMount () {
    this.api.isLoggedIn() && this.updateRepos()
  }
  constructor (props) {
    super(props)
    this.state = initialState
    this.api = new Api(this.updateRepos.bind(this))
  }
  async updateRepos () {
    try {
      const [profile, repos] = await this.api.getRepos()
      this.setState({
        reposData: repos.data.length ? Maybe.Just(repos.data) : Maybe.Nothing(),
        loggedIn: this.api.isLoggedIn(),
        profile: profile
      })
    } catch (err) {
      console.error('Error loading repositories', err)
    }
  }
  onClickNavBar () {
    const self = this
    return this.state.loggedIn
    ? () => { self.setState(initialState); self.api.logout() }
    : this.api.login.bind(this.api)
  }
  render () {
    const { loggedIn, reposData, profile } = this.state
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
          // Download can be retrieved as repo.url, but we used profile to showcase its usage here.
          downloadRepo={`https://github.com/${profile.nickname}/${repo.name}/archive/master.zip`}
        />
    )) : (<Empty
      title='No repositories found'
      description='We couldn’t found any repositories, please try with other user'
    />)
    return (
      <div className='App'>
        <Navbar loggedIn={loggedIn} onClick={this.onClickNavBar.bind(this)} />
        <div className='Container'>
          {
            loggedIn
            ? repos
            : <Empty />
          }
        </div>
      </div>
    )
  }
}

export default App
