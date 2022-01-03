import React from 'react'
import {Avatar} from '../../../components'
import './MessageDisplay.css'

const MessageDisplay = ({user}) => {
  return (
    <>
      <div className="social2__chat_title">
        <Avatar src={user.profilePic} size="social2__small-profileImage"/>
        <span>{user.username}</span>
      </div>

      <div className="social2__chat_text">
      this is a  sample text to test the text medule this is a  sample text to test the text medule this is a  sample text to test the text medule
      </div>

      <div className="social2__chat_time">
        Aprill 2021
      </div>
    </>
  )
}

export default MessageDisplay
