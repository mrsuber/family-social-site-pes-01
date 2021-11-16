import React,{useState,useEffect} from 'react'
import './FollowBtn.css'
import {useSelector, useDispatch} from 'react-redux'

const FollowBtn = ({user}) => {
  const [followed,setFollowed] = useState(false)
  const {auth, profile} = useSelector(state=>state)
  const dispatch = useDispatch()

  const handleFollow = () =>{
    setFollowed(true)
  }
  const handleUnFollow = () =>{
    setFollowed(false)
    // dispatch(follow({users: profile.user,user,auth}))
  }
  return (
    <>
    {
      followed
      ?<button className="social2__unfollow_btn" onClick={handleUnFollow}>UnFollow</button>
      :<button className="social2__follow_btn" onClick={handleFollow}>Follow</button>


    }

    </>
  )
}

export default FollowBtn
