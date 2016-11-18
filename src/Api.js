import axios from 'axios'
import Auth from './Auth'

export default class Api {
  constructor (callback) {
    this.auth = new Auth('xRTGXVGR03uOlQMRds6ZpU0fx8OjLakE', 'jjperezaguinaga.auth0.com', callback)
  }
  getRepos () {
    return this.isLoggedIn()
    ? this.getProfile()
    : Promise.reject(new Error('User is not authenticated'))
  }

  async getProfile () {
    const profile = await axios.post('https://jjperezaguinaga.auth0.com/tokeninfo', {id_token: this.auth.getToken()})
    return Promise.all([
      profile.data,
      axios.get(`https://api.github.com/users/${profile.data.nickname}/repos?per_page=100&sort=updated`)
    ])
  }

  isLoggedIn () {
    return this.auth.loggedIn()
  }
  login () {
    this.auth.login()
  }
  logout () {
    this.auth.logout()
  }
}
