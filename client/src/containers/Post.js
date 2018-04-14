import Post from './../components/Post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deletePost, votePost } from '../modules/posts/actions'

const mapStateToProps = state => {
  const { posts: { loading }, auth: { user } } = state
  const isLoggedIn = state.isLoggedIn

  return { isLoggedIn, user, loading }
}

export default compose(
  connect(mapStateToProps, { deletePost, votePost }),
  withRouter,
)(Post)