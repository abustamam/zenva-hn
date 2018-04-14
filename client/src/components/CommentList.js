import React, { Component } from 'react'
import { Div } from 'glamorous'
import { Icon } from 'antd'
import glam from 'glamorous'

import Comment from './../containers/Comment'
import NewCommentForm from './../containers/NewCommentForm'

class CommentList extends Component {
  componentDidMount() {
    const { requestComments, postId } = this.props
    requestComments(postId)
  }

  render() {
    const { isLoggedIn, comments, postId, loading } = this.props
    if (loading) {
      return <Div>Loading...</Div>
    }

    return (
      <Div css={{ marginTop: 30 }}>
        {isLoggedIn && <NewCommentForm postId={postId} />}
        <Div css={{ marginTop: 30 }}>
          {comments.map(comment => <Comment comment={comment} />)}
        </Div>
      </Div>
    )
  }
}

export default CommentList
