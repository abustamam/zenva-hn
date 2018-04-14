import { fetchApi } from '../api'
import { requestPost } from '../posts/actions'

export const REQUEST_COMMENT = 'comments/REQUEST_COMMENT'
export const REQUEST_COMMENTS = 'comments/REQUEST_COMMENTS'
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'

export const submitComment = (data, cb) => dispatch => fetchApi({
  url: '/comments/',
  data,
  method: 'POST',
}).then(res => {
  const postId = res.data.comment.post
  console.log({ res, postId })
  dispatch(requestPost(postId))
  dispatch(requestComments(postId))
  cb(null, res)
}).catch(cb)

export const voteComment = (id, value) => dispatch => fetchApi({
  url: `/comments/${id}/${value === 1 ? 'upvote' : 'downvote'}`,
  method: 'POST',
}).then(res => {
  const commentId = res.data.comment._id
  console.log({ res, commentId })
  dispatch(requestComment(commentId))
})

export const requestComment = commentId => dispatch => {
  fetchApi({
    url: `/comments/${commentId}`,
    method: 'GET',
  })
  .then(res => dispatch(receiveComment(res.data.comment)))
}

export const requestComments = postId => dispatch => {
  dispatch({ type: REQUEST_COMMENTS })
  fetchApi({
    url: `/posts/${postId}/comments`,
    method: 'GET',
  })
  .then(res => dispatch(receiveComments(res.data.comments)))
}

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
})