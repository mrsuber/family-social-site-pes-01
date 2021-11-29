import React from 'react'
import {Avatar} from '../../components'
import './UserCard.css'
import {Link} from 'react-router-dom'


const UserCard = ({children,user,border,handleClose,setShowFollowers, setShowFollowing}) => {
      const handleCloseAll = () =>{
        if(handleClose) handleClose()
        if(setShowFollowers)setShowFollowers(false)
        if(setShowFollowing)setShowFollowing(false)
      }


  return (
    <div className={`social2__usercard-wrapper ${border}`}>
    <div className="social2__usercard_left">
    <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="social2__usercard_link social2__link">
    <Avatar src={user.profilePic} size="social2__normal-profileImage"/>
    <div className="social2__usercard-name">
      <span className="social2__usercard-username">{user.username}</span>
      <span className="social2__usercard-fullname">{user.fullname}</span>
    </div>
    </Link>
    </div>
{
  children
}
    </div>
  )
}

export default UserCard
