import React from 'react'
import {useSelector} from 'react-redux'
import './Posts.css'
import {PorfilePostCard} from '../../components'

const Posts = () => {
  const { homePosts } = useSelector(state=>state)
  return (
    <div className="social2__posts2">


    {
      homePosts.posts.map(post =>(

        <PorfilePostCard post={post} key={post._id}/>

      ))
    }

    </div>
  )
}

export default Posts
