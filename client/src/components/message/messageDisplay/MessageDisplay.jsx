import React from 'react'
import {Avatar} from '../../../components'
import './MessageDisplay.css'
import {imageShow, videoShow} from '../../../utils/mediaShow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,  } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux'
import { deleteMessages} from '../../../redux/actions/messageAction'
import {VideocamOff, PhoneDisabled , Call,VideoCallSharp} from '@material-ui/icons'
import {Times} from '../../../components'



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
          user._id === auth.user._id && <span className="social2__trash_icon"> <FontAwesomeIcon icon={faTrash}
          className="social2__rightside_message_trash_icon"
          onClick={handleDeleteMessage}
          /></span>

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

        {
          msg.call &&
          <button className="social2__misscall_btn" style={{background:'#eee', borderRadius:'10px'}}>
            <span className="font-weight-bold mr-1" style={{fontSize: '2.5rem', color: msg.call.times ===0 ? 'crimson' : 'green' }}>
              {
                msg.call.times === 0
                ? msg.call.video ? <VideocamOff style={{fontSize: '1.5rem', color: msg.call.times ===0 ? 'crimson' : 'green' }}/> : <PhoneDisabled style={{fontSize: '1.5rem', color: msg.call.times ===0 ? 'crimson' : 'green' }}/>
                : msg.call.video ? <VideoCallSharp style={{fontSize: '1.5rem', color: msg.call.times ===0 ? 'crimson' : 'green' }}/> : <Call style={{fontSize: '1.5rem', color: msg.call.times ===0 ? 'crimson' : 'green' }}/>
              }
            </span>

            <div className="text-left">
            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
            <small>
              {
                msg.call.times > 0
                ?<Times total={ msg.call.times}/>
                : new Date(msg.call.times).toLocaleTimeString()
              }
            </small>
            </div>
          </button>
        }

      </div>


      <div className="social2__chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  )
}

export default MessageDisplay
