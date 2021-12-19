import React from 'react'
import './ShareModal.css'
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  RedditShareButton , RedditIcon
} from 'react-share'


const ShareModal = ({url}) => {
  return (
    <div className="social2__share_modal">
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32}/>
      </FacebookShareButton>
    </div>
  )
}

export default ShareModal
