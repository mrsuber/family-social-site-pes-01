import React,{useState,useEffect} from 'react'
import './FollowBtn.css'
import {useSelector, useDispatch} from 'react-redux'
import {follow,unfollow} from '../../../redux/actions/profileAction'

const FollowBtn = ({user}) => {
  const [followed,setFollowed] = useState(false)
  const {auth, profile} = useSelector(state=>state)
  const dispatch = useDispatch()
  const [load, setload] = useState(false)

  useEffect(()=>{
    if(auth.user.following.find(item => item._id === user._id)){
      setFollowed(true)
    }
  },[auth.user.following,user._id])

  const handleFollow = async() =>{
    if(load) return
    setFollowed(true)
    setload(true)
    await dispatch(follow({users: profile.users,user,auth}))
    setload(false)
  }
  const handleUnFollow = async() =>{
    if(load) return
    setFollowed(false)
    setload(true)
    await dispatch(unfollow({users: profile.users, user, auth}))
    setload(false)
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
