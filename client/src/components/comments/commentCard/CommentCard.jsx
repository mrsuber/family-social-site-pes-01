import React,{useState,useEffect} from 'react'
import './CommentCard.css'
import {Avatar, LikeButton,CommentMenu,InputComments} from '../../../components'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {useSelector, useDispatch} from 'react-redux'
import {updateComment,likeComment,unLikeComment} from '../../../redux/actions/commentAction'



const CommentCard = ({children,comment, post,commentId}) => {
  const {auth} = useSelector(state =>state)

  const dispatch = useDispatch()
  const [content,setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  const [isLike, setIslike] = useState(false)
  const [onEdit,setOnEdit] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [onReply, setOnReply] = useState(false)

  useEffect(()=>{
    setContent(comment.content)
    setIslike(false)
    setOnReply(false)
    if(comment.likes.find(like => like._id === auth.user._id)){
      setIslike(true)
    }
  },[comment,auth.user._id])

  const styleCard = {
    opacity:comment._id ? 1 : 0.5,
    PointerEvent:comment._id ? 'inherit' : 'none'
  }

  const handleLike = async ()=>{
      if(loadLike) return;
      setIslike(true)

      setLoadLike(true)
      dispatch(likeComment({comment, post, auth}))
      setLoadLike(false)
  }
  const handleUnLike = async ()=>{
    if(loadLike) return;
    setIslike(false)

    setLoadLike(true)
    dispatch(unLikeComment({comment, post, auth}))
    setLoadLike(false)
  }

  const handleUpdateComment =()=>{
    if(comment.content !== content){
      dispatch(updateComment({comment, post, content, auth}))
      setOnEdit(false)
    }else{
      setOnEdit(false)
    }
  }

  const handleReply = () => {
    if(onReply)return setOnReply(false)
    setOnReply({...comment,commentId})
  }
  return (
    <div className="social2__comment_card " style={styleCard}>
    <Link to={`/porfile/${comment.user._id}`} className="social2__link social2__comment_avatar_wrapper">
      <Avatar src={comment.user.profilePic} size="social2__small-profileImage"/>
      <h6 className="social2__comment_card_username">{comment.user.username}</h6>

    </Link>
    <div className="social2__comment_content">
      <div className="social2__comment_content_item ">
      {
        onEdit
        ? <textarea rows="5" value={content} onChange={e=>setContent(e.target.value)}/>
        :  <div>
          {
            comment.tag && comment.tag._id !== comment.user._id &&
            <Link to={`/profile/${comment.tag._id}`} className="social2__comment_content_item_link">
              @{comment.tag.username}
            </Link>
          }
          <span>
            {
              content.length < 100 ? content :
              readMore ? content+ " " : content.slice(0, 100)+'....'
            }
          </span>
          {
            content.length > 100 && <span className="social2__readMore" onClick={() => setReadMore(!readMore)}>{readMore ? 'Hide content' : 'Read more'}</span>
          }
          </div>
      }


        <div className="social2__comment_item_container">
          <small className="social2__comment_created_time">
              {moment(comment.createdAt).fromNow()}
          </small>

          <small className="social2__comment_created_likes ">
              {comment.likes.length} likes
          </small>
          {
            onEdit
            ?<>
              <small className="social2__comment_created_reply " onClick={handleUpdateComment}>
                  update
              </small>

              <small className="social2__comment_created_reply " onClick={()=>setOnEdit(false)}>
                  cancel
              </small>
            </>
            : <small className="social2__comment_created_reply " onClick={handleReply}>
                  {onReply ? 'cancel': 'reply'}
              </small>
          }


        </div>

      </div>

      <div className="social2__comment_response_icons">
        <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
        <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit}/>
      </div>
    </div>

    {
      onReply && <InputComments post={post} onReply={onReply} setOnReply={setOnReply}>
      <Link to={`/profile/${onReply.user._id}`} className="social2__comment_username_link">
        @{onReply.user.username}:
      </Link>

      </InputComments >
    }

    {children}
    </div>
  )
}

export default CommentCard
