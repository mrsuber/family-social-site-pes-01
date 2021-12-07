import React,{useState} from 'react'
import './PostCardBody.css'
import {Carousel} from '../../../components'
const PostCardBody = ({post}) => {
  const [readMore, setReadMore] = useState(false)


  return (
    <div className="social2__post_card_body">
    <div className="sociail2__post_card_body_content">
      <span>
      {
        post.content.length < 60
        ? post.content
        : readMore ? post.content + ' ' : post.content.slice(0,60) + '.....'
      }
      </span>
      {
      post.content.length > 60 &&
      <span className="social2__readMore" onClick={()=>setReadMore(!readMore)} >
        {readMore? 'Hide content' : 'Read more'}
      </span>
      }
    </div>

      {
        post.images.length>0 && <Carousel images={post.images} id={post._id}/>
      }
    </div>
  )
}

export default PostCardBody
