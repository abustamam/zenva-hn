import { connect } from 'react-redux'

import CommentList from '../components/CommentList'
import { requestComments, voteComment } from '../modules/comments/actions'
import { requestPosts } from '../modules/posts/actions'

const mapStateToProps = state => {
  const { comments: { loading, comments }, auth: { user } } = state

  // sort here
  const sortedComments = Object.values(comments).sort((a, b) => {
    const dateA = a.createdAt
    const dateB = b.createdAt
    if (dateA < dateB) {
      return -1
    }
    if (dateA > dateB) {
      return 1
    }
    return 0
  })

  const isLoggedIn = Object.keys(user).length !== 0
  const isAdmin = user.role === 'admin'

  return { user, loading, comments: sortedComments, isLoggedIn }
}

export default connect(mapStateToProps, {
  requestPosts,
  voteComment,
  requestComments,
})(CommentList)