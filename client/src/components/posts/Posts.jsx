import React from 'react'
import {useSelector} from 'react-redux'
import './Posts.css'
import {PostCardHeader, PostCardBody, PostCardFooter} from '../../components'

const Posts = () => {
  const { homePosts } = useSelector(state=>state)
  return (
    <div className="social2__posts2">


    {
      homePosts.posts.map(post =>(
        <div key={post._id} className="social2_post_card_wrapper">
        <PostCardHeader post={post}/>
        <PostCardBody post={post} />
        <PostCardFooter post={post}/>
        </div>
      ))
    }

    </div>
  )
}

export default Posts
