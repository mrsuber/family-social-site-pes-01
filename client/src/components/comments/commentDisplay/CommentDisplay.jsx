import React,{useState, useEffect} from 'react'
import './CommentDisplay.css'
import {CommentCard} from '../../../components'

const CommentDisplay = ({comment, post,replyCm}) => {
  const [showRep,setShowRep] = useState([])
  const [next,setNext] = useState(1)

  useEffect(()=>{
      setShowRep(replyCm.slice(replyCm.length - next))
  },[replyCm,next])
  return (
    <div className="social2__comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="social2__comment_display_reply ">
        {
          showRep.map((item,index) =>(
            item.reply &&
            <CommentCard  comment={item} key={index} post={post} commentId={comment._id}/>
          ))
        }

        {
          replyCm.length - next > 0
          ? <div style={{cursor:'pointer',color:'crimson'}} onClick={()=>setNext(next + 10)}>
            see more comments ....
          </div>
          : replyCm.length > 1 && <div style={{cursor:'pointer',color:'crimson'}} onClick={()=>setNext(1)}>
            Hide comments ....
          </div>
        }
        </div>
      </CommentCard>
    </div>
  )
}

export default CommentDisplay
