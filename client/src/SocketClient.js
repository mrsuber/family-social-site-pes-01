import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {POST_TYPES} from './redux/actions/postAction'

const SocketClient = () => {
  const {auth, socket} = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(()=>{
    socket.emit('jionUser', auth.user._id)
  },[socket,auth.user._id])

  //likes
  useEffect(()=>{
    socket.on('likeToClient', newPost =>{
      dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
    })

    return () => socket.off('likeToClient')
  },[socket,dispatch])


  //UnLikes
  useEffect(()=>{
    socket.on('unLikeToClient', newPost =>{
      dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
    })

    return () => socket.off('unLikeToClient')
  },[socket,dispatch])

  return <></>
}

export default SocketClient
