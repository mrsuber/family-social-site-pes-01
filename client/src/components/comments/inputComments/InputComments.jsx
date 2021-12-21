import React,{useState} from 'react'
import './InputComments.css'
import {useSelector,useDispatch} from 'react-redux'
import {createComment} from '../../../redux/actions/commentAction'

const InputComments = ({children,post,onReply,setOnReply}) => {
  const [content, setContent] = useState('')
  const {auth,socket} = useSelector(state=>state)
  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!content.trim()){
        if(setOnReply)return setOnReply(false)
        return
    }

    setContent('')


    const newComment ={
      content,
      likes:[],
      user:auth.user,
      createdAt:new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user

    }
    // console.log(newComment)
    dispatch(createComment({post,newComment,auth,socket}))
    if(setOnReply)return setOnReply(false)

  }


  return (
    <form className=" social2__comment_form" onSubmit={handleSubmit}>
      {children}
      <input type="text" placeholder="Add your comments..." value={content} onChange={e=>setContent(e.target.value)}/>
      <button type="submit" className="social2__comment_postBtn">post</button>
    </form>

  )
}

export default InputComments
