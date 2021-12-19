import React from 'react'
import './PostThumb.css'
import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
import {FavoriteBorder,Favorite,ChatBubbleOutline} from '@material-ui/icons'
// import {img2 as testImage, profile as testProfile} from '../../../images'


const PostThumb = ({posts,result}) => {
  // const { theme} = useSelector(state => state)

  if(result === 0) return <h2 className="social2__post_thumb_wrapper1" >No Post</h2>
  return (
    <section className="social2__post_thumb_section">
    <div className="social2__post_thumb_wrapper">
    <div className="social2__left_thumb_col">
      {
        posts.map(post=>(
          <Link key={post._id} to={`/post/${post._id}`} className="social2__link_thumb">
            <div className="social2__post_thumb_display">
              <img src={post.images[0].url} alt={post.images[0].url} />
              {/*<img src={testImage} alt="testImage" />*/}
              <div className="social2__post_thumb_menu">
              <span><FavoriteBorder />{post.likes.length}</span>
              <span><ChatBubbleOutline/>{post.comments.length}</span>
              </div>


            </div>
          </Link>
        ))
      }
      </div>

      {/*<div className="social2__right_thumb_col">



          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">madara ouchiwa</p>
            </div>
            <button className="social2__action-btn">switch</button>
          </div>

          <p className="social2__suggestion-text">Suggestion for you</p>


          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">followed bu user</p>
            </div>
            <button className="social2__action-btn">follow</button>
          </div>


          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">followed bu user</p>
            </div>
            <button className="social2__action-btn">follow</button>
          </div>


          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">followed bu user</p>
            </div>
            <button className="social2__action-btn">follow</button>
          </div>



          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">followed bu user</p>
            </div>
            <button className="social2__action-btn">follow</button>
          </div>


          <div className="social2__profile-card">
            <div className="social2__profile-pic">
              <img src={testProfile} alt="profile" />
            </div>
            <div>
                <p className='social2__username'>modern_web_channel</p>
                <p className="social2__sub-text">followed bu user</p>
            </div>
            <button className="social2__action-btn">follow</button>
          </div>






      </div>*/}
    </div>
    </section>
  )
}

export default PostThumb
