import React,{useState,useEffect} from 'react'
import './PostCardFooter.css'
import {Link} from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faHeart,faComment } from '@fortawesome/free-solid-svg-icons';
import {ChatBubbleOutline,Send,BookmarkBorder} from '@material-ui/icons'
import {LikeButton,ShareModal} from '../../../components'
import { useSelector, useDispatch } from 'react-redux'
import {likePost,unlikePost} from '../../../redux/actions/postAction'

const PostCardFooter = ({post}) => {
  const [isLike, setIsLike]=useState(false)
  const [loadLike, setLoadLike]=useState(false)
  const [isShare, setIsShare] = useState(false)

  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(post.likes.find(like => like._id === auth.user._id)){
      setIsLike(true)
    }
  },[post.likes, auth.user._id])

  const handleLike = async ()=>{
    if(loadLike) return
    setIsLike(true)

    setLoadLike(true)
    await dispatch(likePost({post, auth}))
    setLoadLike(false)
  }

  const handleUnLike = async()=>{
    if(loadLike) return
    setIsLike(false)


    setLoadLike(true)
    await dispatch(unlikePost({post, auth}))
    setLoadLike(false)
  }

  return (
    <div className="social2__post_card_footer">
    <div className="social2__post_card_footer_icon_menu">
        <div className="social2__send_icon_container">
          <LikeButton
           isLike={isLike}
           handleLike={handleLike}
           handleUnLike={handleUnLike}
           />
          <Link to={`/post/${post._id}`} className="social2__link">
            <ChatBubbleOutline/>
          </Link>
          <Send className="social2__send_icon" onClick={()=> setIsShare(!isShare)}/>
        </div>

        <BookmarkBorder/>
    </div>
    <div className="social2__post_card_footer_foot">
    <h6> {post.likes.length} likes</h6>
    <h6> {post.comments.length} comments</h6>
    </div>
    {
      isShare && <ShareModal url="http://google.com"/>
    }
    </div>
  )
}

export default PostCardFooter
