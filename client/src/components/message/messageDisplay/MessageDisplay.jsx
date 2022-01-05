import React from 'react'
import {Avatar} from '../../../components'
import './MessageDisplay.css'
import {imageShow, videoShow} from '../../../utils/mediaShow'

const MessageDisplay = ({user,msg}) => {
  return (
    <>
      <div className="social2__chat_title">
        <Avatar src={user.profilePic} size="social2__small-profileImage"/>
        <span>{user.username}</span>
      </div>
        {
          msg.text &&
          <div className="social2__chat_text">
            {msg.text}
          </div>
        }

        {
          msg.media.map((item, index)=>(
            <div key={index}>
                {
                  item.url.match(/video/i)
                  ? videoShow(item.url)
                  : imageShow(item.url)
                }
            </div>
          ))
        }

      <div className="social2__chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MessageDisplay
