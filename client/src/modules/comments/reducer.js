import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS } from './actions'

const initialState = {
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, loading: true }
    case RECEIVE_COMMENTS:
      const comments = action.comments.reduce(
        (acc, comment) => ({
          ...acc,
          [comment._id]: comment
        }),
        {}
      )
      return { ...state, comments, loading: false }
    case RECEIVE_COMMENT: {
      const { comment } = action
      const { comments } = state
      return { ...state, comments: { ...comments, [comment._id]: comment } }
    }
    default:
      return state
  }
}
