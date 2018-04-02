import cookie from 'js-cookie'
import axios from 'axios'

const baseUrl = '/api'

export const fetchApi = (opts = {}) => {
  const headers = {}
  const token = cookie.get('token')
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  const url = `${baseUrl}${opts.url}`
  return axios({ ...opts, url, headers })
}
