import React,{useState, useEffect} from 'react'
import './comments.css'
import {CommentDisplay} from '../../components'

const Comments = ({post}) => {
  const [comments, setComments] = useState([])
  const [showComments,setShowComments] = useState([])

  const [next, setNext] = useState(2)

  useEffect(()=>{
    const newComments = post.comments.filter(cm => !cm.reply)
    setComments(newComments)
    setShowComments(newComments.slice(newComments.length - next))
  },[post.comments, next])

  
  return (
    <div className="social2__comments">
      {
        showComments.map(comment=>(
          <CommentDisplay key={comment._id} comment={comment} post={post}/>
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
