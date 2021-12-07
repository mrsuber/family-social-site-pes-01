import React from 'react'
import './PostCardFooter.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faComment } from '@fortawesome/free-solid-svg-icons';
import {FavoriteBorder,ChatBubbleOutline,Mood,ThumbUpAlt,ThumbDown,AddComment,Send,BookmarkBorder} from '@material-ui/icons'


const PostCardFooter = ({post}) => {
  return (
    <div className="social2__post_card_footer">
    <div className="social2__post_card_footer_icon_menu">
        <div className="social2__send_icon_container">
          <FavoriteBorder/>
          <Link to={`/post/${post._id}`} className="social2__link">
            <ChatBubbleOutline/>
          </Link>
          <Send className="social2__send_icon"/>
        </div>

        <BookmarkBorder/>
    </div>
    <div className="social2__post_card_footer_foot">
    <h6> {post.likes.length}</h6>
    <h6> {post.comments.length} comments</h6>
    </div>
    </div>
  )
}

export default PostCardFooter
