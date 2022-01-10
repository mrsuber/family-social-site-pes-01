import React from 'react'
import {Avatar} from '../../../components'
import './MessageDisplay.css'
import {imageShow, videoShow} from '../../../utils/mediaShow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux'
import { deleteMessages} from '../../../redux/actions/messageAction'

const MessageDisplay = ({user,msg,data}) => {

  const { auth } = useSelector(state=>state)
  const dispatch = useDispatch()

  const handleDeleteMessage = () =>{
    if(!data)return
    
    if(window.confirm('Do you want to delete?')){
      dispatch(deleteMessages({msg, data, auth}))
    }


  }
  return (
    <>
      <div className="social2__chat_title">
        <Avatar src={user.profilePic} size="social2__small-profileImage"/>
        <span>{user.username}</span>

      </div>

      <div className="social2__you_content">
        {
          user._id === auth.user._id && <FontAwesomeIcon icon={faTrash}
          className="social2__rightside_message_trash_icon"
          onClick={handleDeleteMessage}
          />

        }
        <div>
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
        </div>

      </div>


      <div className="social2__chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MessageDisplay
