import { fetchApi } from '../api'

export const REQUEST_POSTS = 'posts/REQUEST_POSTS'
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const REQUEST_POST = 'posts/REQUEST_POST'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const SUBMIT_POST = 'posts/SUBMIT_POST'

export const requestPosts = () => dispatch => {
  dispatch({ type: REQUEST_POSTS })
  fetchApi({ url: '/posts', method: 'get' })
  .then(res => dispatch(receivePosts(res.data.posts)))
}

export const requestPost = postId => dispatch => {
  console.log({ postId })

  dispatch({ type: REQUEST_POSTS })
  fetchApi({
    url: `/posts/${postId}`,
    method: 'GET',
  })
  .then(res => dispatch(receivePost(res.data.post)))
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
})

export const submitPost = (data, cb) => dispatch => fetchApi({
  url: '/posts',
  data,
  method: 'POST',
}).then(res => cb(null, res)).catch(cb)

export const submitVote = (value) => dispatch => fetchApi({
  url: `/posts/${value === 1 ? 'upvote' : 'downvote'}`,
  method: 'POST'
}).then(res => dispatch(requestPost(res.data.post._id)))