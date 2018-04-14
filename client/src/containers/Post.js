import Post from './../components/Post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deletePost, votePost } from '../modules/posts/actions'

const mapStateToProps = (state, props) => {
  const { posts: { loading }, auth: { user } } = state
  const { post } = props
  const isLoggedIn = state.isLoggedIn
  console.log({ post, user })
  return { isLoggedIn, user, loading }
}

export default compose(
  connect(mapStateToProps, { deletePost, votePost }),
  withRouter
)(Post)
