import Post from './../components/Post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deletePost, votePost } from '../modules/posts/actions'

const mapStateToProps = ({ posts: { loading }, auth: { user, isLoggedIn } }) => ({
  isLoggedIn,
  user,
  loading,
})

export default compose(
  connect(mapStateToProps, { deletePost, votePost }),
  withRouter,
)(Post)
