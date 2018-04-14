import {
  DELETE_POST_SUCCESS,
  RECEIVE_POST,
  RECEIVE_POSTS,
  REQUEST_POST,
  REQUEST_POSTS,
  VOTE_POST
} from './actions'

const initialState = {
  loading: false,
  posts: {},
  pendingDelete: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POST:
      return { ...state, loading: true }
    case RECEIVE_POSTS: {
      const posts = action.posts.reduce(
        (acc, post) => ({ ...acc, [post._id]: post }),
        {}
      )
      return { ...state, posts, loading: false }
    }
    case DELETE_POST_SUCCESS: {
      const { postId } = action
      const { posts } = state

      return {
        ...state,
        posts: Object.values(posts).reduce(
          (acc, post) =>
            post._id === postId
              ? acc
              : {
                  ...acc,
                  [post._id]: post
                },
          {}
        )
      }
    }
    case RECEIVE_POST:
      const { post } = action
      const { posts } = state
      return { ...state, posts: { ...posts, [post._id]: post }, loading: false }
    case VOTE_POST: {
      const { postId, userId } = action
      const { posts } = state
      const post = posts[postId]
      return { ...state, posts: { ...posts, [post._id]: { ...post } } }
    }
    default:
      return state
  }
}
