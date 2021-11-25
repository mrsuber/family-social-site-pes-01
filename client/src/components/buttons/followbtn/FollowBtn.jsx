import React,{useState,useEffect} from 'react'
import './FollowBtn.css'
import {useSelector, useDispatch} from 'react-redux'
import {follow,unfollow} from '../../../redux/actions/profileAction'

const FollowBtn = ({user}) => {
  const [followed,setFollowed] = useState(false)
  const {auth, profile} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(auth.user.following.find(item => item._id === user._id)){
      setFollowed(true)
    }
  },[auth.user.following,user._id])

  const handleFollow = () =>{
    setFollowed(true)
    dispatch(follow({users: profile.users,user,auth}))
  }
  const handleUnFollow = () =>{
    setFollowed(false)
    dispatch(unfollow({users: profile.users,user,auth}))

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
