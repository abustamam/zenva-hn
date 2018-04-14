import { connect } from 'react-redux'

import { voteComment, deleteComment } from '../modules/comments/actions'
import Comment from './../components/Comment'

const mapStateToProps = (state, props) => {
  const { auth: { user } } = state
  const { comment } = props
  const { author } = comment

  const isLoggedIn = Object.keys(user).length !== 0
  const isAdmin = user.role === 'admin'

  const canDelete = isAdmin || author._id === user.userId

  return { user, isLoggedIn, isAdmin, canDelete }
}

export default connect(mapStateToProps, { voteComment, deleteComment })(Comment)