import React,{useEffect} from 'react'
import './MessageDetails.css'
import {Social2Header,MessageLeftSide,MessageRightSide} from '../../../../components'


import {useSelector, useDispatch} from 'react-redux'
import {getNotifies} from '../../../../redux/actions/notifyAction'


const MessageDetails = () => {

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
        <div className=" social2__message_leftside">
            <MessageLeftSide/>
        </div>

        <div className=" social2__message_middle">
          <MessageRightSide/>
        </div>

    </div>
    </section>
    </>
  )
}

export default MessageDetails
