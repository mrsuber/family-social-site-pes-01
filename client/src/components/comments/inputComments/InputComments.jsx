import React,{useState} from 'react'
import './InputComments.css'
import {useSelector,useDispatch} from 'react-redux'
import {createComment} from '../../../redux/actions/commentAction'

const InputComments = ({children,post}) => {
  const [content, setContent] = useState('')
  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!content.trim())return
    const newComment ={
      content,
      likes:[],
      user:auth.user,
      createdAt:new Date().toISOString()

    }
    dispatch(createComment(post,newComment,auth))
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
