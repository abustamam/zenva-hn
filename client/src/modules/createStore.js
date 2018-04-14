import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { authUser } from './auth/actions'

import authReducer from './auth/reducer'
import postsReducer from './posts/reducer'
import commentsReducer from './comments/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default initialState => {
  const middlewares = applyMiddleware(thunk)
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(middlewares)
  )
  store.dispatch(authUser())
  return store
}
