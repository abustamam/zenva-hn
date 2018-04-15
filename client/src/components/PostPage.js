import React, { Component } from 'react'
import { Div } from 'glamorous'
import CommentList from './../containers/CommentList'

import Post from './../containers/Post'

class PostPage extends Component {
  componentDidMount() {
    const { requestPost, match: { params: { postId } }, history } = this.props
    requestPost(postId, (err, res) => {
      if (err) {
        return history.push('/not-found')
      }
    })
  }

  render() {
    const { post } = this.props
    return !post ? (
      <Div>Loading</Div>
    ) : (
      <Div>
        <Post post={post} showText />
        <CommentList postId={post._id} />
      </Div>
    )
  }
}

export default PostPage
