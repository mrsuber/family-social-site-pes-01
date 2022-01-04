import React,{useState, useEffect} from 'react'
import './MessageRightSide.css'
import {UserCard, MessageDisplay,Icons} from '../../../components'
import {useSelector , useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {NearMe} from '@material-ui/icons'
import {CameraAlt,Image} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';


const MessageRightSide = () => {
  const {auth, message} = useSelector(state => state)
  const dispatch = useDispatch()

  const {id} = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    const newUser = message.users.find(user => user._id === id)
    if(newUser){
      setUser(newUser)
    }
  },[message.users,id])

  const handleChangeMedia = () =>{

  }
  return (
    <>
    <div className="social2__righside_message_header">
      <UserCard user={user}>
        <FontAwesomeIcon icon={faTrash} className="social2__rightside_message_trash_icon"/>
      </UserCard>
    </div>
    <div className="socials2__rightside_chat_container">
      <div className="social2__chat_display">
          <div className="social2__chat_row social2__other_message">
              <MessageDisplay user={user} />
          </div>


          <div className="social2__chat_row social2__you_message">
              <MessageDisplay user={auth.user} />
          </div>

      </div>
    </div>

    <form className="social2__chat_input">
      <input type="text" placeholder="Enter you message... "
      value={text} onChange={e => setText(e.target.value)}
      />
      <div className="social2__file_upload">
        <Image/>
        <input type="file" name="file" id="file" multiple accept="image/*,video/*" onChange={handleChangeMedia}/>
      </div>
      <button disabled={text? false : true} type="submit">
        <NearMe/>
      </button>
    </form>
    </>
  )
}

export default MessageRightSide
