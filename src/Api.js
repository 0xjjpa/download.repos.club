import axios from 'axios'
import Auth from './Auth'

export default class Api {
  constructor (callback) {
    this.auth = new Auth('xRTGXVGR03uOlQMRds6ZpU0fx8OjLakE', 'jjperezaguinaga.auth0.com', callback)
  }
  getRepos () {
    return this.isLoggedIn()
    ? axios.get('https://api.github.com/users/jjperezaguinaga/repos?per_page=100&sort=updated')
    : Promise.reject(new Error('User is not authenticated'))
  }
  getProfile (callback) {
    this.isLoggedIn() && this.auth.lock.getProfile(
        this.auth.getToken(),
        callback
    )
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
