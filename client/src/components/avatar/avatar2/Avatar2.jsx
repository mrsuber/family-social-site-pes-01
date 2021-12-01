import React from 'react'
import './Avatar2.css'

const Avatar2 = ({profile}) => {
  return (
    <div className="social2__profile-pic">
      <img src={profile} alt="profile" />
    </div>
  )
}

export default Avatar2
