import React from 'react'
import './comments.css'
import {CommentDisplay} from '../../components'

const Comments = ({post}) => {
  return (
    <div className="social2__comments">
      {
        post.comments.map(comment=>(
          <CommentDisplay key={comment._id} comment={comment} post={post}/>
        ))
      }
    </div>
  )
}

export default Comments
