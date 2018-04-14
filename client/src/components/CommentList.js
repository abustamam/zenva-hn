import React, { Component } from 'react'
import { Div, Span } from 'glamorous'
import { DateTime } from 'luxon'
import { Icon } from 'antd'
import glam from 'glamorous'

import NewCommentForm from './../containers/NewCommentForm'

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

class CommentList extends Component {
  componentDidMount() {
    const { requestComments, postId } = this.props
    requestComments(postId)
  }

  render() {
    const { isLoggedIn, comments, user, voteComment, postId, loading } = this.props
    const { userId } = user
    if (loading) {
      return <Div>Loading...</Div>
    }

    return <Div css={{ marginTop: 30 }}>
      {isLoggedIn && <NewCommentForm postId={postId} />}
      <Div css={{ marginTop: 30 }}>
        {comments.map(comment => {
          const { upVotes, downVotes, _id: commentId, author, createdAt, text, voteScore } = comment
          return <Div
            css={{ marginBottom: 30, display: 'flex', alignItems: 'flex-start' }}>
            {isLoggedIn && <Div
              css={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
              <VoteIcon inactive={upVotes.includes(userId)}
                        onClick={() => voteComment(commentId, 1)} type="caret-up" />
              <VoteIcon inactive={downVotes.includes(userId)}
                        onClick={() => voteComment(commentId, -1)} type="caret-down" />
            </Div>}
            <Div>
            <Span
              css={{ fontWeight: 'bolder' }}>{author.username}</Span> |
              <Span css={{
                fontWeight: 'light',
                fontSize: 11,
              }}> {voteScore} points {DateTime.fromISO(createdAt)
                                              .toLocaleString()}</Span>
              <Div>{text}</Div>
            </Div>
          </Div>
        })}
      </Div>
    </Div>
  }
}

export default CommentList