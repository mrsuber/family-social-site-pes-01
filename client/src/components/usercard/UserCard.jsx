import React from 'react'
import {Avatar} from '../../components'
import './UserCard.css'


const UserCard = ({user,border,handleClose,}) => {

  return (
    <div className={`social2__usercard-wrapper ${border}`}>
    <Avatar src={user.profilePic} size="social2__normal-profileImage"/>
    <div className="social2__usercard-name">
      <span className="social2__usercard-username">{user.username}</span>
      <span className="social2__usercard-fullname">{user.fullname}</span>
    </div>

    </div>
  )
}

export default UserCard
