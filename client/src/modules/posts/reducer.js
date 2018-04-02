import { RECEIVE_POST, RECEIVE_POSTS, REQUEST_POST, REQUEST_POSTS } from './actions'

const initialState = {
  loading: false,
  posts: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POST:
      return { ...state, loading: true }
    case RECEIVE_POSTS: {
      const posts = action.posts.reduce((acc, post) => ({ ...acc, [post._id]: post }), {})
      return { ...state, posts, loading: false }
    }
    case RECEIVE_POST:
      const { post } = action
      const { posts } = state
      return { ...state, posts: { ...posts, [post._id]: post }, loading: false }
    default:
      return state
  }
}
