import { connect } from 'react-redux'
import PostPage from '../components/PostPage'
import { requestPost } from '../modules/posts/actions'

const mapStateToProps = (state, props) => {
  const { match: { params: { postId } } } = props
  const { posts: { posts, loading } } = state

  return { post: posts[postId], loading }
}

export default connect(mapStateToProps, { requestPost })(PostPage)