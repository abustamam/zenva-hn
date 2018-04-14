import cookie from 'js-cookie'

import { fetchApi } from '../api'

export const AUTH_USER = 'auth/AUTH_USER'
export const RECEIVE_USER = 'auth/RECEIVE_USER'
export const LOGIN_USER = 'auth/LOGIN_USER'
export const LOGOUT_USER = 'auth/LOGOUT_USER'
export const UPDATE_TOKEN = 'auth/UPDATE_TOKEN'

export const authUser = () => dispatch =>
  fetchApi({ url: '/auth', method: 'GET' })
    .then(res => dispatch(receiveUser(res.data.user)))
    .catch(err => console.log(err))

export const loginUser = (data, cb) => dispatch =>
  fetchApi({
    url: '/auth/login',
    data,
    method: 'POST'
  })
    .then(res => {
      updateToken(res.data.token)
      const { role, _id: userId, username } = res.data.user
      dispatch(receiveUser({ role, userId, username }))
      cb(null)
    })
    .catch(cb)

export const signupUser = (data, cb) => dispatch =>
  fetchApi({
    url: '/auth/signup',
    data,
    method: 'POST'
  })
    .then(res => {
      updateToken(res.data.token)
      const { role, _id: userId, username } = res.data.user
      dispatch(receiveUser({ role, userId, username }))
      cb(null)
    })
    .catch(cb)

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const logoutUser = () => ({ type: LOGOUT_USER })

export const updateToken = token => cookie.set('token', token)
