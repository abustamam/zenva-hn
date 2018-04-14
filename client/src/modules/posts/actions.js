import { fetchApi } from '../api'

export const REQUEST_POSTS = 'posts/REQUEST_POSTS'
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const REQUEST_POST = 'posts/REQUEST_POST'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const DELETE_POST_SUCCESS = 'posts/DELETE_POST_SUCCESS'
export const VOTE_POST = 'posts/VOTE_POST'

export const requestPosts = () => dispatch => {
  dispatch({ type: REQUEST_POSTS })
  fetchApi({ url: '/posts', method: 'get' }).then(res =>
    dispatch(receivePosts(res.data.posts))
  )
}

export const requestPost = (postId, cb = () => {}) => dispatch => {
  dispatch({ type: REQUEST_POST })
  fetchApi({
    url: `/posts/${postId}`,
    method: 'GET'
  })
    .then(res => dispatch(receivePost(res.data.post)))
    .then(() => cb(null))
    .catch(cb)
}

export const votePost = (id, value) => dispatch =>
  fetchApi({
    url: `/posts/${id}/${value === 1 ? 'upvote' : 'downvote'}`,
    method: 'POST'
  }).then(res => dispatch(receivePost(res.data.post)))

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const submitPost = (data, cb = () => {}) => dispatch =>
  fetchApi({
    url: '/posts',
    data,
    method: 'POST'
  })
    .then(res => cb(null, res))
    .catch(cb)

export const deletePost = (postId, cb = () => {}) => dispatch =>{
  console.log({ postId })

  fetchApi({
    url: `/posts/${postId}`,
    method: 'DELETE'
  })
    .then(() => dispatch({ type: DELETE_POST_SUCCESS, postId }))
    .then(() => cb(null))
    .catch(cb)
}