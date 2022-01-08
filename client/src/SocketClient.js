import React,{useEffect,useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {POST_TYPES} from './redux/actions/postAction'
import {GLOBALTYPES} from './redux/actions/globlaTypes'
import {NOTIFY_TYPES} from './redux/actions/notifyAction'
import {MESS_TYPES} from './redux/actions/messageAction'
import aud1 from './audio/client_src_audio_got-it-done-613.mp3'

const spawnNotification = (body, icon, url, title) =>{
  let options = {
    body, icon
  }
  let n = new Notification(title,options)

  n.onclick = e =>{
    e.preventDefault()
    window.open(url,'_blank')
  }
}

const SocketClient = () => {
  const {auth, socket,notify} = useSelector(state => state)
  const dispatch = useDispatch()
  const audioRef = useRef()


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

  //CreateComment
  useEffect(()=>{
    socket.on('createCommentToClient', newPost =>{
      dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
    })

    return () => socket.off('createCommentToClient')
  },[socket,dispatch])


  //CreateComment
  useEffect(()=>{
    socket.on('deleteCommentToClient', newPost =>{
      dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
    })

    return () => socket.off('deleteCommentToClient')
  },[socket,dispatch])


  //follow
  useEffect(()=>{
    socket.on('followToClient', newUser =>{
      dispatch({type:GLOBALTYPES.AUTH, payload:{...auth, user:newUser}})
    })

    return () => socket.off('followToClient')
  },[socket,dispatch,auth])

  //unfollow
  useEffect(()=>{
    socket.on('unFollowToClient', newUser =>{
      dispatch({type:GLOBALTYPES.AUTH, payload:{...auth, user:newUser}})
    })

    return () => socket.off('unFollowToClient')
  },[socket,dispatch,auth])

  //Notification
  useEffect(()=>{
    socket.on('createNotifyToClient', msg =>{
      dispatch({type:NOTIFY_TYPES.CREATE_NOTIFY, payload:msg})
      if(notify.sound) audioRef.current.play()
      spawnNotification(
        msg.user.username + ' ' + msg.text,
        msg.user.profilePic,
        msg.url,
        'Geneasocial'

      )
    })

    return () => socket.off('createNotifyToClient')
  },[socket,dispatch,notify.sound])



  useEffect(()=>{
    socket.on('removeNotifyToClient', msg =>{

      dispatch({type:NOTIFY_TYPES.REMOVE_NOTIFY, payload:msg})

    })

    return () => socket.off('removeNotifyToClient')
  },[socket,dispatch])

//messageing
useEffect(()=>{
  socket.on('addMessageToClient', msg =>{
    dispatch({type:MESS_TYPES.ADD_MESSAGE, payload:msg})
    dispatch({type:MESS_TYPES.ADD_USER, payload:{...msg.user, text:msg.text, media:msg.media}})


  })

  return () => socket.off('addMessageToClient')
},[socket,dispatch])

// chec user online / offline
useEffect(() => {
  socket.emit('checkUserOnline', auth.user)
},[socket, auth.user])




  return (
      <>
        <audio controls ref={audioRef} style={{display:'none'}}>
        <source src={aud1} type="audio/mp3"/>
        </audio>
      </>
  )
}

export default SocketClient
