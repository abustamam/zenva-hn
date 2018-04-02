import React, { Component } from 'react'
import { Div } from 'glamorous'

import Post from './Post'

class PostList extends Component {
  componentDidMount() {
    this.props.requestPosts()
  }

  render() {
    const { posts, loading } = this.props
    return <Div>
      {(!posts) ? <Div>Loading</Div> :
       <Div>{posts.map(post => <Post key={post._id} post={post} />)}</Div>}
    </Div>
  }
}

export default PostList