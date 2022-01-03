import React from 'react'
import './MessageDetails.css'
import {Social2Header,MessageLeftSide,MessageRightSide} from '../../../../components'


const MessageDetails = () => {
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
