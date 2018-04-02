import { fetchApi } from '../api'
import { requestPost } from '../posts/actions'

export const submitComment = (data, cb) => dispatch => fetchApi({
  url: '/comments/',
  data,
  method: 'POST',
}).then(res => {
  const postId = res.data.comment.post
  console.log({ res, postId })
  dispatch(requestPost(postId))
  cb(null, res)
}).catch(cb)
