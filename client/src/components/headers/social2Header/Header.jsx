import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {Home,NearMe,Explore,Favorite,MoreHoriz,Mood,ThumbUpAlt,ThumbDown,AddComment,Send,BookmarkBorder} from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faTrash


 } from '@fortawesome/free-solid-svg-icons';

import './Header.css'
import logo from '../../../images/suber_logo1.png'
import post from '../../../images/blog-1.jpg'
import profile from '../../../images/me.webp'

const Header = () => {
  const navLinks = [
    {label:'Home',icon:<Home/>,path:'/'},
    {label:'Message',icon:<NearMe/>,path:'/message'},
    {label:'Discover',icon:<Explore/>,path:'/discover'},
    {label:'Notify',icon:<Favorite/>,path:'/notify'},
  ]

  const navLinks2 = [
    {label:'Home',icon:<Home/>,path:'/'},
    {label:'Message',icon:<NearMe/>,path:'/message'},
    {label:'Discover',icon:<Explore/>,path:'/discover'},
    {label:'Notify',icon:<Favorite/>,path:'/notify'},

  ]
  // let social2__navbar=document.querySelector('.social2__navbar');
  //
  // function social2__navwidow(){
  //     social2__navbar.classList.toggle('social2__active')
  // }
  return (
    <>
    <nav className="social2__navbar">
      <div className="social2__nav-wrapper">
        <span className="social2__brand-wrapper">
          <img src={logo} className="social2__brand-img" alt=""/>
          <h1 className="social2_logoText">Geneasocial</h1>

        </span>
        <span> <input type="text" className="social2__search-box" placeholder="search" /></span>
        <div className="social2__nav-items">
        {navLinks2.map((link,index)=>(
          link.icon
        ))}

          <img src={profile} alt="profilepic" className="social2__user-profileImage"/>

        </div>
      </div>
    </nav>

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
              <input type="text" class="social2__comment-box" placeholder="Add a comment"/>
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
              <input type="text" class="social2__comment-box" placeholder="Add a comment"/>
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
              <input type="text" class="social2__comment-box" placeholder="Add a comment"/>
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
              <input type="text" class="social2__comment-box" placeholder="Add a comment"/>
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
              <input type="text" class="social2__comment-box" placeholder="Add a comment"/>
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

    {/*<header className="social2__header">
    <Link to="/" className="social2__logo social2_link">
    <img src={logo} alt="logo" className="social2__logoImg"/>
    <h1 className="social2_logoText">Geneasocial</h1>
    </Link>
    <nav className="social2__navbar">
    {
      navLinks.map((link,index)=>(

          <Link to={link.path} className="social2_HeaderListItem1 social2__link">
            <span className="social2_HeaderListItemIcon">{link.icon}</span>
            <span className="social2_HeaderListItemText">{link.label}</span>
          </Link>

      ))
    }



    </nav>
    <div className="social2_search-wrapper">
    <form className="social2__search-form">
      <input type="search" id="ecom__search-box" className="social2__search-input" placeholder="Search here..." />
      <label htmlFor="ecom__search-box" className="social2__search-icon"><FontAwesomeIcon icon={ faSearch }/></label>
    </form>
    </div>
    <div className="social2__linkWrapper">
    <div className="social2__icons2">
    {
      navLinks2.map((link,index)=>(

          <Link to={link.path} className="social2_HeaderListItem2 social2__link">
            <span className="social2_HeaderListItemIcon2">{link.icon}</span>
            <span className="social2_HeaderListItemText2">{link.label}</span>
          </Link>

      ))
    }
    </div>


    </div>

    </header>*/}
    {/*<nav className="social2HeaderWrapper">
    <Link to="/" className="social2HeaderLogo social2__link" >MSB-social</Link>
    <div className="social2HeaderMenu">
      <ul className="social2HeaderList">
        {
          navLinks.map((link,index)=>(
            <li className="social2HeaderListItem">
              <Link to={link.path} className="social2__link">
                <span className="social2HeaderListItemIcon">{link.icon}</span>
              </Link>
            </li>
          ))
        }
        <li className="social2HeaderListItem dropdown">

        </li>
      </ul>

    </div>
    </nav>*/}


    </>
  )
}

export default Header
