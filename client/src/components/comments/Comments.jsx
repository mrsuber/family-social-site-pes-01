import React,{useState, useEffect} from 'react'
import './comments.css'
import {CommentDisplay} from '../../components'

const Comments = ({post}) => {
  const [comments, setComments] = useState([])
  const [showComments,setShowComments] = useState([])
  const [next, setNext] = useState(2)
  const [replyComments, setReplyComments] = useState([])

  useEffect(()=>{
    const newComments = post.comments.filter(cm => !cm.reply)
    setComments(newComments)
    setShowComments(newComments.slice(newComments.length - next))
  },[post.comments, next])

  useEffect(()=>{
    const newRep = post.comments.filter(cm => cm.reply)
    setReplyComments(newRep)
  },[post.comments])


  return (
    <div className="social2__comments">
      {
        showComments.map((comment, index)=>(
          <CommentDisplay key={index} comment={comment} post={post} replyCm={replyComments.filter(item => item.reply=== comment._id)}/>
        ))
      }

      {
        comments.length - next > 0
        ? <div className="p-2 border-top social2__comment_see_more" onClick={()=>setNext(next + 10)}>
          see more comments ....
        </div>
        : comments.length > 2 && <div className="p-2 border-top social2__comment_see_more"  onClick={()=>setNext(2)}>
          Hide comments ....
        </div>
      }
    </div>
  )
}

export default Comments
