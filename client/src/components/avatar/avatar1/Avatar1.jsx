import React from 'react'
import './Avatar1.css'

const Avatar1 = ({profile,username}) => {
  return (
    <div className="social2__status-card">
      <div className="social2__profile-pic">
        <img src={profile} alt="social2__profilepic" />
      </div>
      <p className="social2__username">{username}</p>
    </div>
  )
}

export default Avatar1
