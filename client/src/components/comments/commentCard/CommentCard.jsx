import React,{useState,useEffect} from 'react'
import './CommentCard.css'
import {Avatar} from '../../../components'
import {Link} from 'react-router-dom'
import moment from 'moment'

const CommentCard = ({comment, post}) => {
  const [content,setContent] = useState('')
  const [readMore, setReadMore] = useState(false)

  useEffect(()=>{
    setContent(comment.content)
  },[comment])

  const styleCard = {
    opacity:comment._id ? 1 : 0.5,
    PointerEvent:comment._id ? 'inherit' : 'none'
  }
  return (
    <div className="social2__comment_card " style={styleCard}>
    <Link to={`/porfile/${comment.user._id}`} className="social2__link social2__comment_avatar_wrapper">
      <Avatar src={comment.user.profilePic} size="social2__small-profileImage"/>
      <h6 className="social2__comment_card_username">{comment.user.username}</h6>

    </Link>
    <div className="social2__comment_content">
      <div className="social2__comment_content_item ">
        <div>
        <span>
          {
            content.length < 100 ? content :
            readMore ? content+ " " : content.slice(0, 100)+'....'
          }
        </span>
        {
          content.length > 100 && <span className="social2__readMore" onClick={() => setReadMore(!readMore)}>{readMore ? 'Hide content' : 'Read more'}</span>
        }
        </div>

        <div className="social2__comment_item_container">
          <small className="social2__comment_created_time">
              {moment(comment.createdAt).fromNow()}
          </small>

          <small className="social2__comment_created_likes ">
              {comment.likes.length} likes
          </small>

          <small className="social2__comment_created_reply ">
              reply
          </small>
        </div>

      </div>
    </div>

    </div>
  )
}

export default CommentCard
