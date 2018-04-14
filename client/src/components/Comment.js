import { DateTime } from 'luxon'
import React from 'react'
import glam, { Div, Span } from 'glamorous'
import { Icon, Modal } from 'antd'

const { confirm } = Modal

const showDeleteConfirm = (commentId, username, deleteComment) => {
  confirm({
    title: 'Are you sure you want to delete this comment?',
    content: `This comment by ${username} will be deleted!`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deleteComment(commentId, (err, res) => {})
    }
  })
}

const DeleteButton = glam.span({
  cursor: 'pointer'
})

const VoteIcon = glam(Icon)(
  {
    color: 'rgba(0,0,0,.25)',
    cursor: 'pointer',
    ':hover': {
      color: 'rgba(0,0,0,.5)'
    }
  },
  ({ inactive }) =>
    inactive && {
      color: 'white',
      cursor: 'not-allowed',
      ':hover': { color: 'white' }
    }
)

const Comment = ({
  comment,
  canDelete,
  voteComment,
  isLoggedIn,
  user,
  deleteComment
}) => {
  const {
    upVotes,
    downVotes,
    author,
    createdAt,
    text,
    voteScore,
    _id: commentId
  } = comment
  const { userId } = user
  return (
    <Div
      css={{
        marginBottom: 30,
        display: 'flex',
        alignItems: 'flex-start'
      }}
    >
      {isLoggedIn && (
        <Div
          css={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: 10
          }}
        >
          <VoteIcon
            inactive={upVotes.includes(userId)}
            onClick={() => voteComment(commentId, 1)}
            type="caret-up"
          />
          <VoteIcon
            inactive={downVotes.includes(userId)}
            onClick={() => voteComment(commentId, -1)}
            type="caret-down"
          />
        </Div>
      )}
      <Div>
        <Span css={{ fontWeight: 'bolder' }}>{author.username}</Span> |
        <Span
          css={{
            fontWeight: 'light',
            fontSize: 11
          }}
        >
          {' '}
          {voteScore} points {DateTime.fromISO(createdAt).toLocaleString()}
          {canDelete && (
            <Span>
              {' '}
              |{' '}
              <DeleteButton
                onClick={() =>
                  showDeleteConfirm(commentId, author.username, deleteComment)
                }
              >
                Delete
              </DeleteButton>
            </Span>
          )}
        </Span>
        <Div>{text}</Div>
      </Div>
    </Div>
  )
}

export default Comment
