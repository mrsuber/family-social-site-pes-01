import React,{useState,useEffect} from 'react'
import './PostCardFooter.css'
import {Link} from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faHeart,faComment } from '@fortawesome/free-solid-svg-icons';
import {ChatBubbleOutline,Send,BookmarkBorder,Bookmark} from '@material-ui/icons'
import {LikeButton,ShareModal} from '../../../components'
import { useSelector, useDispatch } from 'react-redux'
import {likePost,unlikePost,savePost,unsavePost} from '../../../redux/actions/postAction'
import {BASE_URL} from '../../../utils/config'
const PostCardFooter = ({post}) => {
  const [isLike, setIsLike]=useState(false)
  const [loadLike, setLoadLike]=useState(false)
  const [isShare, setIsShare] = useState(false)

  const {auth,socket} = useSelector(state=>state)
  const dispatch = useDispatch()
  const [saved, setSaved] = useState(false)
  const [saveLoad,setSaveLoad] = useState(false)
//likes
  useEffect(()=>{
    if(post.likes.find(like => like._id === auth.user._id)){
      setIsLike(true)
    }else{
      setIsLike(false)
    }
  },[post.likes, auth.user._id])

  const handleLike = async ()=>{
    if(loadLike) return
    setIsLike(true)

    setLoadLike(true)
    await dispatch(likePost({post, auth,socket}))
    setLoadLike(false)
  }

  const handleUnLike = async()=>{
    if(loadLike) return
    setIsLike(false)


    setLoadLike(true)
    await dispatch(unlikePost({post, auth,socket}))
    setLoadLike(false)
  }

  //saved

  useEffect(()=>{
    if(auth.user.saved.find(id => id === post._id)){
      setSaved(true)
    }else{
      setSaved(false)
    }
  },[auth.user.saved, post._id])


  const handleSavePost = async ()=>{
    if(saveLoad) return

    setSaveLoad(true)
    await dispatch(savePost({post, auth}))
    setSaveLoad(false)
  }

  const handleUnSavePost = async()=>{
    if(saveLoad) return

    setSaveLoad(true)
    await dispatch(unsavePost({post, auth}))
    setSaveLoad(false)
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
        {
          saved
          ?    <Bookmark className="social2__bookmark social2__bookmark_style"  onClick={handleUnSavePost}/>
          :  <BookmarkBorder className="social2__bookmark_style" onClick={handleSavePost}/>
        }

    </div>
    <div className="social2__post_card_footer_foot">
    <h6> {post.likes.length} likes</h6>
    <h6> {post.comments.length} comments</h6>
    </div>
    {
      isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`}/>
    }
    </div>
  )
}

export default PostCardFooter
