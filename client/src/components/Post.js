import React from 'react'
import { Div } from 'glamorous'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import { DateTime } from 'luxon'

const Post = ({ post, index, ...props }) => {
  console.log({ post, props })
  return <Div css={{ display: 'flex', alignItems: 'center' }}>
    <Div css={{ marginRight: 10 }}>{post.voteScore}</Div>
    <Div css={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
      <Icon type="caret-up" style={{ color: 'rgba(0,0,0,.25)' }} />
      <Icon type="caret-down" style={{ color: 'rgba(0,0,0,.25)' }} />
    </Div>
    <Div css={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
      <Div>
        {post.title}
      </Div>
      <Div>
        Posted by {post.author.username} {DateTime.fromISO(post.createdAt)
                                                  .toLocaleString()} | <Link
        to={`/posts/${post._id}`}>{post.comments.length} comments</Link>
      </Div>
    </Div>
  </Div>
}

export default Post