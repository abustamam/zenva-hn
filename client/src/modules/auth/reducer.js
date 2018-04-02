import cookie from 'js-cookie'

import { LOGOUT_USER, RECEIVE_USER } from './actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      const { user } = action
      return { ...state, user }
    case LOGOUT_USER:
      cookie.remove('token')
      return { ...state, user: null }
    default:
      return state
  }
}
