import React from 'react'
import {Social2Header,MessageLeftSide} from '../../../components'
import { ReactComponent as FacebookMessagericon } from '../../../images/geneosocial/facebook_messenger_icon_136645.svg'
import './Message.css'
import {Facebook} from '@material-ui/icons'
const Message = () => {
  return (
    <>
    <Social2Header/>
    <section className="social2__message_section">
      <div className="social2__message__container">
          <div className=" social2__message_leftside">
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
