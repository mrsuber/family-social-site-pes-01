import React from 'react'
import './PostCardHeader.css'
import {Avatar} from '../../../components'
import { Link } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import {MoreHoriz, Create,DeleteOutline,FileCopyOutlined} from '@material-ui/icons'


const PostCardHeader = ({post}) => {
  const {auth} = useSelector(state => state)
  return (
    <div className="social2__post_card_header">
    <div className="social2__post_card_header_container">
    <Avatar src={post.user.profilePic} size="social2__normal-profileImage"/>

    <div className="social2__post_card_name">
      <h6>
      <Link to={`/profile/${post.user._id}`} className="social2__link">
      {post.user.username}
       </Link>
      </h6>
      <small>{moment(post.createdAt).fromNow()}</small>
    </div>

    </div>
    <div className="social2__post_card_nav_item  social2__dropdown">
        <MoreHoriz id="moreLink" data-toggle="social2__post_card_nav_item_dropdown" className="social2__post_card_icon"/>

        <div className="social2__dropdown-content">
          {
              auth.user._id === post.user._id &&
              <>
              <div className="social2__post_card_nav_item_dropdown_item">
                <Create className="social2__post_card_icon" /> Edit Post
              </div>
              <div className="social2__post_card_nav_item_dropdown_item">
                <DeleteOutline className="social2__post_card_icon" /> Remove Post
              </div>
              </>
          }
          <div className="social2__post_card_nav_item_dropdown_item">
            <FileCopyOutlined className="social2__post_card_icon" /> Copy Link
          </div>
        </div>
    </div>

    </div>
  )
}

export default PostCardHeader
