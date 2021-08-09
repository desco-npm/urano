import axios from 'axios'

const Http = axios.create()

Http.defaults.baseURL = 'http://localhost/'
Http.defaults.timeout = 300000

export function setHeader (prop, value) {
  Http.defaults.headers.common[prop] = value
}

export function setToken (value) {
  setHeader('Authorization', `Bearer ${value}`)
}

export function setBaseURL (url) {
  Http.defaults.baseURL = url
}

export function setTimeout (time) {
  Http.defaults.timeout = time
}

export default Http