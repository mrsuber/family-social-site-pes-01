import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './NotifyModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faBellSlash, faCircle } from '@fortawesome/free-solid-svg-icons';
import img from '../../../images/geneosocial/notice.png'
import {Link } from 'react-router-dom'
import {Avatar} from '../../../components'
import moment from 'moment'

const NotifyModal = () => {
  const {auth,notify} = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <div className="social2__notification__modal_wrapper">
      <div className="social2__notification__modal_container">
        <h3>Notification</h3>

        {
          notify.sound
          ?<FontAwesomeIcon icon={faBell} className="social2__notification__modal_bell_icon"/>
          :<FontAwesomeIcon icon={faBellSlash} className="social2__notification__modal_bell_icon"/>
        }
      </div>
      <hr/>
      {
        notify.data.length === 0 &&
        <img src={img} alt="no-notice" className="social2__notification__modal_img" />
      }

      <div className="social2__notification__modal_items_wrapper">
      {  notify.data.map((msg,index) =>(
        <div key={index} className="social2__notification__modal_items">
            <Link to={`${msg.url}`} className="social2__notification__modal_link">
              <Avatar src={msg.user.profilePic} size ="social2__normal-profileImage"/>
              <div className="social2__notification__modal_sub_items">
                <div>
                  <strong className="social2__notification__modal_sub_item_username">{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small> {msg.content.slice(0,20)}...</small>}
              </div>

              <div className="social2__notification__modal_sub_image">
                {msg.image && <Avatar src={msg.image} size="social2__medium-profileImage"/>}
              </div>
            </Link>

            <small className="social2__notification__modal_time_container">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <FontAwesomeIcon icon={faCircle} className="social2__notification__modal_circle_icon"/>}
            </small>
        </div>
      ))}
      </div>
      <hr/>
      <div className=" social2__notification__modal_delete_container">
        Delete All
      </div>
    </div>
  )
}

export default NotifyModal