import React, { Component } from 'react'
import { Div } from 'glamorous'
import CommentList from './../containers/CommentList'

import Post from './Post'

class PostPage extends Component {
  componentDidMount() {
    const { requestPost, match: { params: { postId } } } = this.props
    requestPost(postId)
  }

  render() {
    const { loading, post } = this.props
    console.log('post page', this.props)

    return (!post) ? <Div>Loading</Div> : <Div>
      <Post post={post} />
      <CommentList comments={post.comments} postId={post._id} />
    </Div>
  }
}

export default PostPage