import cookie from 'js-cookie'
import { LOGOUT_USER, RECEIVE_USER } from './actions'

const token = cookie.get('token')
const isLoggedIn = !!token

const initialState = { user: {}, isLoggedIn }

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      const { user } = action
      return { ...state, user, isLoggedIn: true }
    case LOGOUT_USER:
      cookie.remove('token')
      return { ...state, user: {}, isLoggedIn: false }
    default:
      return state
  }
}
