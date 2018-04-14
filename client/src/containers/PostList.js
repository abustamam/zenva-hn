import { connect } from 'react-redux'
import PostList from '../components/PostList'
import { requestPosts } from '../modules/posts/actions'

const mapStateToProps = state => {
  const { posts: { posts, loading } } = state
  // sort here
  const sortedPosts = Object.values(posts).sort((a, b) => {
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

  return { posts: sortedPosts, loading }
}

export default connect(mapStateToProps, { requestPosts })(PostList)
