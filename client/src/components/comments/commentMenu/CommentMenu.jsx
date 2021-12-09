import React from 'react'
import './CommentMenu.css'
import {MoreVert,DeleteOutline,Create} from '@material-ui/icons'


const CommentMenu = ({post,comment,auth}) => {
   const MenuItem = () => {
     return(
       <>
       <div className="sociall2__comment_dropdown_item dropdown-item">
         <Create /> Edit
         </div>

       <div className="sociall2__comment_dropdown_item dropdown-item">
         <DeleteOutline /> Remove
         </div>


       </>
     )
   }
  return (
    <div className="social2__comment_menu">

      {
        (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&

        <div className=" social2__comment_dropdown social2__dropdown">
          <MoreVert id="social2__moreLink" data-toggle="social2__dropdown"/>
          <div className="social2__comment_dropdown_menu social2__dropdown-content" aria-labelledby="social2__moreLink">
              {
                post.user._id === auth.user._id
                ? comment.user._id === auth.user._id
                    ? MenuItem()
                    : <div className="sociall2__comment_dropdown_item ">
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
