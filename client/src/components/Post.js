import React from 'react'
import glam, { Div, A, Span } from 'glamorous'
import { Link } from 'react-router-dom'
import { Icon, Modal, Button } from 'antd'
import { DateTime } from 'luxon'

const { confirm } = Modal

const showDeleteConfirm = (postId, title, deletePost, redirect) => {
  confirm({
    title: 'Are you sure you want to delete this post?',
    content: `${title} will be deleted!`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deletePost(postId, (err, res) => {
        if (err) {
          return
        }
        redirect('/')
      })
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

const VoteIcon = glam(Icon)({
  color: 'rgba(0,0,0,.25)',
  cursor: 'pointer',
  ':hover': {
    color: 'rgba(0,0,0,.5)',
  },
}, ({ inactive }) => inactive && {
  color: 'white',
  cursor: 'not-allowed',
  ':hover': { color: 'white' },
})

const DeleteButton = glam.span({
  cursor: 'pointer',
})

const Post = ({ isLoggedIn, post, index, votePost, user, deletePost, history, ...props }) => {
  const redirect = history.push
  const { upVotes, downVotes, url, voteScore, createdAt, title, author, comments, _id: postId } = post
  const postUrl = `/posts/${postId}`
  const { userId, role } = user
  return <Div css={{ display: 'flex', alignItems: 'center' }}>
    {isLoggedIn && <Div
      css={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
      <VoteIcon inactive={upVotes.includes(userId)} onClick={() => votePost(postId, 1)}
                type="caret-up" />
      <VoteIcon inactive={downVotes.includes(userId)}
                onClick={() => votePost(postId, -1)} type="caret-down" />
    </Div>}
    <Div css={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
      <Div>
        {url ? <A href={url}>{title}</A> : <Link to={postUrl}>{title}</Link>}
      </Div>
      <Div css={{ fontWeight: 'light', fontSize: 12 }}>
        {voteScore} points | Posted
        by {author.username} {DateTime.fromISO(createdAt)
                                      .toLocaleString()} | <Link
        to={postUrl}>{comments.length} comments</Link>
        {role === 'admin' && <Span> | <DeleteButton
          onClick={() => showDeleteConfirm(postId, title, deletePost, redirect)}>Delete</DeleteButton></Span>}
      </Div>
    </Div>
  </Div>
}

export default Post