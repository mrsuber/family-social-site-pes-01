import React,{useEffect} from 'react'
import {Social2Header,MessageLeftSide} from '../../../components'
import './Message.css'
import { ReactComponent as FacebookMessagericon } from '../../../images/geneosocial/facebook_messenger_icon_136645.svg'


import {useSelector, useDispatch} from 'react-redux'
import {getNotifies} from '../../../redux/actions/notifyAction'

const Message = () => {

  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(auth.token){

      dispatch(getNotifies(auth.token))
    }
  },[dispatch,auth.token])

  useEffect(()=>{
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  },[])

  return (
    <>
    <Social2Header/>
    <section className="social2__message_section">
      <div className="social2__message__container">
          <div className=" social2__message_leftside1">
              <MessageLeftSide/>
          </div>

          <div className=" social2__message_middle">
          <div className="social2__message_middle_item">
            <FacebookMessagericon className="social2__mesenger_icon"/>
            <h4>Messenger</h4>
          </div>
          </div>

      </div>

    </section>
    </>
  )
}

export default Message
