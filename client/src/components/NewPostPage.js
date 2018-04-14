import React from 'react'
import NewPostForm from './../containers/NewPostForm'
import { Div, H3 } from 'glamorous'

const NewPostPage = ({ history }) => (
  <Div>
    <H3>Submit a new post</H3>
    <NewPostForm redirect={postId => history.push(`/posts/${postId}`)} />
  </Div>
)

export default NewPostPage
