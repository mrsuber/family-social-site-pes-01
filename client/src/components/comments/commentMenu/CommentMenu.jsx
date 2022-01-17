import React from 'react'
import './CommentMenu.css'
import {MoreVert,DeleteOutline,Create} from '@material-ui/icons'
import { useDispatch,useSelector} from 'react-redux'
import {deleteComment} from '../../../redux/actions/commentAction'


const CommentMenu = ({post,comment,setOnEdit}) => {
  const {auth,socket} = useSelector(state=>state)
  const dispatch = useDispatch()

  const handleRemove = () => {
    if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
      dispatch(deleteComment({post, auth, comment,socket}))

    }
  }
   const MenuItem = () => {
     return(
       <>
       <div className="sociall2__comment_dropdown_item dropdown-item" onClick={() => setOnEdit(true)}>
         <Create /> Edit
         </div>

       <div className="sociall2__comment_dropdown_item dropdown-item" onClick={handleRemove}>
         <DeleteOutline /> Remove
         </div>


       </>
     )
   }
  return (
    <div className="social2__comment_menu">

      {
        (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&

        <div className=" nav-item dropdown">
        <span className="nav-link social2__adjust_avatar" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

          <MoreVert id="social2__moreLink" data-toggle="social2__dropdown"/>
          </span>
          <div className="dropdown-menu social2__comment_dropdown_style" aria-labelledby="navbarDropdown">
              {
                post.user._id === auth.user._id
                ? comment.user._id === auth.user._id
                    ? MenuItem()
                    : <div className="sociall2__comment_dropdown_item " onClick={handleRemove}>
                      <DeleteOutline /> Remove
                      </div>
                    : comment.user._id === auth.user._id && MenuItem()
              }
          </div>
        </div>
      }
    </div>
  )
}

export default CommentMenu
