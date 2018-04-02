import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { requestPosts } from '../modules/posts/actions'

const mapStateToProps = state => {
  const { posts: { loading }, auth: { user } } = state
  return { user, loading }
}

export default connect(mapStateToProps, { requestPosts })(CommentList)