import React from 'react'
import './PostCardHeader.css'
import {Avatar} from '../../../components'
import { Link } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import {MoreHoriz, Create,DeleteOutline,FileCopyOutlined} from '@material-ui/icons'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {deletePost} from '../../../redux/actions/postAction'

const PostCardHeader = ({post}) => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleEditPost = ()=>{

    dispatch({type:GLOBALTYPES.STATUS, payload:{...post,onEdit:true}})
  }

  const handleDeletePost = ()=>{
    dispatch(deletePost({post,auth}))
  }

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
              <div className="social2__post_card_nav_item_dropdown_item" onClick={handleEditPost}>
                <Create className="social2__post_card_icon" /> Edit Post
              </div>
              <div className="social2__post_card_nav_item_dropdown_item" onClick={handleDeletePost}>
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
