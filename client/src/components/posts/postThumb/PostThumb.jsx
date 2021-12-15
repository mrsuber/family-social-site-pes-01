import React from 'react'
import './PostThumb.css'
import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
import {FavoriteBorder,Favorite,ChatBubbleOutline} from '@material-ui/icons'



const PostThumb = ({posts}) => {
  // const { theme} = useSelector(state => state)
  return (
    <div className="social2__post_thumb">
      {
        posts.map(post=>(
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="social2__post_thumb_display">
              <img src={post.images[0].url} alt={post.images[0].url} />

              <div className="social2__post_thumb_menu">
              <span><FavoriteBorder />{post.likes.length}</span>
              <span><ChatBubbleOutline/>{post.comments.length}</span>
              </div>


            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default PostThumb
