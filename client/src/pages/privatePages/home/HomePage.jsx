import React from 'react'
import './HomePage.css'
import {Social2Header} from '../../../components'
import {MoreHoriz,Mood,ThumbUpAlt,ThumbDown,AddComment,Send,BookmarkBorder} from '@material-ui/icons'
import post from '../../../images/blog-1.jpg'
import profile from '../../../images/me.webp'
const HomePage = () => {
  return (
    <>
    <div className="social2__homepage-body">
    <Social2Header/>
    <section className="social2__main">
        <div className="social2__mainWrapper">
          <div className="social2__left-col">


            <div className="social2__status-wrapper">

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber1</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber2</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber3</p>
                </div>


                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber4</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber5</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber6</p>
                </div>

                <div className="social2__status-card">
                  <div className="social2__profile-pic">
                    <img src={profile} alt="social2__profilepic" />
                  </div>
                  <p className="social2__username">mrsuber7</p>
                </div>


            </div>


            <div className="social2__post">
              <div className="social2__info">
                <div className="social2__user">
                  <div className="social2__profile-pic">
                    <img src={profile} alt=""/>
                  </div>
                  <p className="social2__username">modern_web_channel</p>
                </div>
                <MoreHoriz className="social2__options"/>
              </div>
              <img src={post} alt="post" className="social2__post-image"/>
              <div className="social2__post-content">
                  <div className="social2__reaction-wrapper">
                    <ThumbUpAlt className="social2__likeIcon social2Icon"/>
                    <ThumbDown className="social2__dislikeIcon social2Icon"/>
                    <AddComment className="social2__commentIcon social2Icon"/>
                    <Send className="social2__sendIcon"/>
                    <BookmarkBorder className="social2__saveIcon social2Icon"/>

                  </div>
                <p className="social2__likes">1,012 likes</p>
                <p className="social2__description"><span>username </span> I was going to the market and happen to suble upon a snake that had
                a black line on it's head and blue strips on its body about 10 fit long and all coiled up at the middle of the road. </p>
                <p className='social2__post-time'>2 minutes ago</p>
              </div>
              <div className="social2__comment-wrapper">
              <Mood className="social2__icon"/>
              <input type="text" className="social2__comment-box" placeholder="Add a comment"/>
              <button className="social2__comment-btn">Post</button>
              </div>
            </div>

            <div className="social2__post">
              <div className="social2__info">
                <div className="social2__user">
                  <div className="social2__profile-pic">
                    <img src={profile} alt=""/>
                  </div>
                  <p className="social2__username">modern_web_channel</p>
                </div>
                <MoreHoriz className="social2__options"/>
              </div>
              <img src={post} alt="post" className="social2__post-image"/>
              <div className="social2__post-content">
                  <div className="social2__reaction-wrapper">
                    <ThumbUpAlt className="social2__likeIcon social2Icon"/>
                    <ThumbDown className="social2__dislikeIcon social2Icon"/>
                    <AddComment className="social2__commentIcon social2Icon"/>
                    <Send className="social2__sendIcon"/>
                    <BookmarkBorder className="social2__saveIcon social2Icon"/>

                  </div>
                <p className="social2__likes">1,012 likes</p>
                <p className="social2__description"><span>username </span> I was going to the market and happen to suble upon a snake that had
                a black line on it's head and blue strips on its body about 10 fit long and all coiled up at the middle of the road. </p>
                <p className='social2__post-time'>2 minutes ago</p>
              </div>
              <div className="social2__comment-wrapper">
              <Mood className="social2__icon"/>
              <input type="text" className="social2__comment-box" placeholder="Add a comment"/>
              <button className="social2__comment-btn">Post</button>
              </div>
            </div>

            <div className="social2__post">
              <div className="social2__info">
                <div className="social2__user">
                  <div className="social2__profile-pic">
                    <img src={profile} alt=""/>
                  </div>
                  <p className="social2__username">modern_web_channel</p>
                </div>
                <MoreHoriz className="social2__options"/>
              </div>
              <img src={post} alt="post" className="social2__post-image"/>
              <div className="social2__post-content">
                  <div className="social2__reaction-wrapper">
                    <ThumbUpAlt className="social2__likeIcon social2Icon"/>
                    <ThumbDown className="social2__dislikeIcon social2Icon"/>
                    <AddComment className="social2__commentIcon social2Icon"/>
                    <Send className="social2__sendIcon"/>
                    <BookmarkBorder className="social2__saveIcon social2Icon"/>

                  </div>
                <p className="social2__likes">1,012 likes</p>
                <p className="social2__description"><span>username </span> I was going to the market and happen to suble upon a snake that had
                a black line on it's head and blue strips on its body about 10 fit long and all coiled up at the middle of the road. </p>
                <p className='social2__post-time'>2 minutes ago</p>
              </div>
              <div className="social2__comment-wrapper">
              <Mood className="social2__icon"/>
              <input type="text" className="social2__comment-box" placeholder="Add a comment"/>
              <button className="social2__comment-btn">Post</button>
              </div>
            </div>



            <div className="social2__post">
              <div className="social2__info">
                <div className="social2__user">
                  <div className="social2__profile-pic">
                    <img src={profile} alt=""/>
                  </div>
                  <p className="social2__username">modern_web_channel</p>
                </div>
                <MoreHoriz className="social2__options"/>
              </div>
              <img src={post} alt="post" className="social2__post-image"/>
              <div className="social2__post-content">
                  <div className="social2__reaction-wrapper">
                    <ThumbUpAlt className="social2__likeIcon social2Icon"/>
                    <ThumbDown className="social2__dislikeIcon social2Icon"/>
                    <AddComment className="social2__commentIcon social2Icon"/>
                    <Send className="social2__sendIcon"/>
                    <BookmarkBorder className="social2__saveIcon social2Icon"/>

                  </div>
                <p className="social2__likes">1,012 likes</p>
                <p className="social2__description"><span>username </span> I was going to the market and happen to suble upon a snake that had
                a black line on it's head and blue strips on its body about 10 fit long and all coiled up at the middle of the road. </p>
                <p className='social2__post-time'>2 minutes ago</p>
              </div>
              <div className="social2__comment-wrapper">
              <Mood className="social2__icon"/>
              <input type="text" className="social2__comment-box" placeholder="Add a comment"/>
              <button className="social2__comment-btn">Post</button>
              </div>
            </div>




            <div className="social2__post">
              <div className="social2__info">
                <div className="social2__user">
                  <div className="social2__profile-pic">
                    <img src={profile} alt=""/>
                  </div>
                  <p className="social2__username">modern_web_channel</p>
                </div>
                <MoreHoriz className="social2__options"/>
              </div>
              <img src={post} alt="post" className="social2__post-image"/>
              <div className="social2__post-content">
                  <div className="social2__reaction-wrapper">
                    <ThumbUpAlt className="social2__likeIcon social2Icon"/>
                    <ThumbDown className="social2__dislikeIcon social2Icon"/>
                    <AddComment className="social2__commentIcon social2Icon"/>
                    <Send className="social2__sendIcon"/>
                    <BookmarkBorder className="social2__saveIcon social2Icon"/>

                  </div>
                <p className="social2__likes">1,012 likes</p>
                <p className="social2__description"><span>username </span> I was going to the market and happen to suble upon a snake that had
                a black line on it's head and blue strips on its body about 10 fit long and all coiled up at the middle of the road. </p>
                <p className='social2__post-time'>2 minutes ago</p>
              </div>
              <div className="social2__comment-wrapper">
              <Mood className="social2__icon"/>
              <input type="text" className="social2__comment-box" placeholder="Add a comment"/>
              <button className="social2__comment-btn">Post</button>
              </div>
            </div>

          </div>
          <div className="social2__right-col">


              <div className="social2__profile-card">
                <div className="social2__profile-pic">
                  <img src={profile} alt="profile" />
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
                  <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className='social2__username'>modern_web_channel</p>
                    <p className="social2__sub-text">followed bu user</p>
                </div>
                <button className="social2__action-btn">follow</button>
              </div>


              <div className="social2__profile-card">
                <div className="social2__profile-pic">
                  <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className='social2__username'>modern_web_channel</p>
                    <p className="social2__sub-text">followed bu user</p>
                </div>
                <button className="social2__action-btn">follow</button>
              </div>


              <div className="social2__profile-card">
                <div className="social2__profile-pic">
                  <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className='social2__username'>modern_web_channel</p>
                    <p className="social2__sub-text">followed bu user</p>
                </div>
                <button className="social2__action-btn">follow</button>
              </div>



              <div className="social2__profile-card">
                <div className="social2__profile-pic">
                  <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className='social2__username'>modern_web_channel</p>
                    <p className="social2__sub-text">followed bu user</p>
                </div>
                <button className="social2__action-btn">follow</button>
              </div>


              <div className="social2__profile-card">
                <div className="social2__profile-pic">
                  <img src={profile} alt="profile" />
                </div>
                <div>
                    <p className='social2__username'>modern_web_channel</p>
                    <p className="social2__sub-text">followed bu user</p>
                </div>
                <button className="social2__action-btn">follow</button>
              </div>





          </div>
        </div>
    </section>
</div>
    </>
  )
}

export default HomePage
