import React,{useState, useEffect} from 'react'
import './ProfilePost.css'
import {PostThumb} from '../../../components'
const ProfilePost = ({auth,profile,dispatch,id}) => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    profile.userPosts.forEach(data => {
      if((data._id)===id){
        setPosts(data.posts)
      }
    });

  },[  profile.userPosts,id])

  return (

    <>

    <PostThumb posts={posts}/>
    </>
  )
}

export default ProfilePost
