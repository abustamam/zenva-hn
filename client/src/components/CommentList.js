import React from 'react'
import { Div } from 'glamorous'
import NewCommentForm from './../containers/NewCommentForm'

const CommentList = ({ comments, user, postId, ...props }) => {
  const canAddComments = !!user
  console.log({ comments, user, props, canAddComments })

  return <Div css={{ marginTop: 30 }}>
    {canAddComments && <NewCommentForm postId={postId} />}
    <Div css={{ marginTop: 30 }}>Comments!</Div>
  </Div>
}

export default CommentList