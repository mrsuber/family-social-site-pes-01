import React,{useState, useEffect} from 'react'
import './ProfilePost.css'
import {PostThumb} from '../../../components'
const ProfilePost = ({auth,profile,dispatch,id}) => {

  const [posts, setPosts] = useState([])
  const [result , setResult] = useState(9)

  useEffect(()=>{
    profile.posts.forEach(data => {
      if((data._id)===id){
        setPosts(data.posts)
        setResult(data.result)
      }
    });

  },[  profile.posts,id])

  return (

    <>

    <PostThumb posts={posts} result={result}/>
    </>
  )
}

export default ProfilePost
