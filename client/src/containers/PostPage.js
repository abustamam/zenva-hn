import { connect } from 'react-redux'
import PostPage from '../components/PostPage'
import { requestPost } from '../modules/posts/actions'

const mapStateToProps = (state, props) => {
  console.log({ state, props })
  const { match: { params: { postId} } } = props
  const { posts: { posts, loading }, auth: { user } } = state
  return { post: posts[postId], user, loading }
}

export default connect(mapStateToProps, { requestPost })(PostPage)