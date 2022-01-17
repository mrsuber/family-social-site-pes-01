import React from 'react'
import './PostCardHeader.css'
import {Avatar} from '../../../components'
import { Link, useHistory } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import moment from 'moment'
import {MoreHoriz, Create,DeleteOutline,FileCopyOutlined} from '@material-ui/icons'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {deletePost} from '../../../redux/actions/postAction'
import {BASE_URL} from '../../../utils/config'

const PostCardHeader = ({post}) => {
  const {auth,socket} = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useHistory()

  const handleEditPost = ()=>{

    dispatch({type:GLOBALTYPES.STATUS, payload:{...post,onEdit:true}})
  }

  const handleDeletePost = ()=>{
    if(window.confirm("Are you sure you want to delete this post?")){
      dispatch(deletePost({post,auth,socket}))
      return history.push("/social_home")
    }

  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    dispatch({type:GLOBALTYPES.ALERT,payload:{success:"Copy Done!"}})

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
    <div className="nav-item dropdown">
    <span className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        <MoreHoriz id="moreLink" data-toggle="social2__post_card_nav_item_dropdown" className="social2__post_card_icon"/>
    </span>

        <div className="dropdown-menu social2__translate_post_dropdown" aria-labelledby="navbarDropdown" >
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
          <div className="social2__post_card_nav_item_dropdown_item" onClick={handleCopyLink}>
            <FileCopyOutlined className="social2__post_card_icon" /> Copy Link
          </div>
        </div>
    </div>

    </div>
  )
}

export default PostCardHeader
