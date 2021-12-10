import React from 'react'
import './CommentDisplay.css'
import {CommentCard} from '../../../components'

const CommentDisplay = ({comment, post}) => {
  return (
    <div className="social2__comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>

      </CommentCard>
    </div>
  )
}

export default CommentDisplay
