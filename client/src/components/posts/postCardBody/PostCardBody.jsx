import React from 'react'
import './PostCardBody.css'
import {Carousel} from '../../../components'
const PostCardBody = ({post}) => {
  return (
    <div className="social2__post_card_body">
    <div className="sociail2__post_card_body_content">
      <span>{post.content}</span>
    </div>

      {
        post.images.length>0 && <Carousel />
      }
    </div>
  )
}

export default PostCardBody
