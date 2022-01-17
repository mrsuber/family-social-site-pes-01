import React,{useState, useEffect, useRef} from 'react'
import './MessageRightSide.css'
import {UserCard, MessageDisplay,Icons} from '../../../components'
import {useSelector , useDispatch} from 'react-redux'
import {useParams, useHistory } from 'react-router-dom'
import {NearMe} from '@material-ui/icons'
import {Image} from '@material-ui/icons'
import {CircularProgress} from "@material-ui/core"
import {MoreVert} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faPhoneAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {imageShow, videoShow} from '../../../utils/mediaShow'
import {imageUpload} from '../../../utils/imageUpload'
import {addMessage,getMessages,loadMoreMessages,deleteConversation} from '../../../redux/actions/messageAction'


const MessageRightSide = () => {
  const {auth, message, socket, peer} = useSelector(state => state)
  const dispatch = useDispatch()

  const {id} = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const [media,setMedia] = useState([])
  const [loadMedia, setloadMedia] = useState(false)


  const refDisplay = useRef()
  const pageEnd = useRef()
  const [page, setPage] = useState(0)

  const [data, setData] = useState([])
  const [result, setResult] = useState(9)
  const [isLoadMore, setIsLoadMore] = useState(0)

  const history = useHistory()
  useEffect(()=>{
    // const newData = message.data.filter(item => item.sender === auth.user._id || item.sender === id)
    // setData(newData)
    const newData = message.data.find( item => item._id === id)
    if(newData){
      setData(newData.messages)
      setResult(newData.result)
      setPage(newData.page)
    }

  },[message.data,id])

  useEffect(()=>{
    if(id && message.users.length > 0){
      setTimeout(()=>{
        refDisplay.current.scrollIntoView({behavior:'smooth', block:'end'})
      },50)
    const newUser = message.users.find(user => user._id === id)
    if(newUser){
      setUser(newUser)
    }
  }
  },[message.users,id])

  const handleChangeMedia = (e) =>{

      const files = [...e.target.files]
      let err = ""
      let newMedia = []

      files.forEach(file =>{
        if(!file) return err="File does not exist."
        if(file.size > 1024 * 1024 * 5 ){
          return err = "The image/video largest is 5mb."
        }

        return newMedia.push(file)

      })

      if(err)dispatch({ type:GLOBALTYPES.ALERT,payload:{error:err} })
      setMedia([...media, ...newMedia])
  }


  const handleDeleteMedia = (index) =>{
    const newArr = [...media]
    newArr.splice(index,1)
    setMedia(newArr)
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!text.trim() && media.length === 0) return
    setText('')
    setMedia([])
    setloadMedia(true)

    let newArr = []
    if(media.length>0) newArr = await imageUpload(media)

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }

    setloadMedia(false)
    dispatch(addMessage({msg,auth,socket}))
    if(refDisplay.current){
      refDisplay.current.scrollIntoView({behavior: 'smooth', block:'end'})
    }
  }

  useEffect(()=>{
    if(id){
      const getMessagesData = async () => {
        if(message.data.every(item => item._id !== id)){


        await dispatch(getMessages({auth, id}))

        setTimeout(()=>{
          refDisplay.current.scrollIntoView({behavior:'smooth', block:'end'})
        },50)
      }
      }

      getMessagesData()
    }
  },[id, dispatch,auth,message.data])

  //load more

  useEffect(() => {
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        setIsLoadMore(p => p + 1)
      }
    },{
      threshold: 0.1
    })
    observer.observe(pageEnd.current)
  },[setIsLoadMore])

  useEffect(() => {
    if(isLoadMore > 1){
      if(result >= page * 9 ){
        dispatch(loadMoreMessages({auth, id, page:page + 1}))
        setIsLoadMore(1)
      }
    }

  },[isLoadMore])



  // useEffect(() => {
  //   if(refDisplay.current){
  //     refDisplay.current.scrollIntoView({behavior: 'smooth', block:'end'})
  //   }
  // },[text])

  const handleDeleteConversation = () => {
    if(window.confirm('Do you want to delete?')){
      dispatch(deleteConversation({auth, id}))
      return history.push('/message')
    }

  }


//call
  const caller = ({video})=>{
    const {_id, profilePic, username, fullname} = user

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      profilePic, username, fullname, video
    }

    dispatch({type:GLOBALTYPES.CALL, payload:msg})
  }

  const callUser = ({video})=>{
    const {_id, profilePic, username, fullname} = auth.user

    const msg = {
      sender: _id,
      recipient: user._id,
      profilePic, username, fullname, video
    }

    if(peer._open) msg.peerId = peer._id

    socket.emit('callUser', msg)
  }


  const handleAudioCall =()=>{
    caller({video: false})
    callUser({video:false})
  }

  const handleVideoCall = () =>{
    caller({video: true})
    callUser({video:true})
  }
  return (
    <>
    <div className="social2__righside_message_header">
      {
        user.length !== 0 &&
         <UserCard user={user}>
         {/*Notify dropdown*/}
         <div className="nav-item dropdown social2__call_dropdown">
           <span className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <span><MoreVert/></span>

           </span>

           <div className="dropdown-menu social2__call_dropdown_items" aria-labelledby="navbarDropdown">
           <FontAwesomeIcon icon={faPhoneAlt} className="social2__rightside_message_audio_phone_icon" onClick={handleAudioCall}/>

           <FontAwesomeIcon icon={faVideo} className="social2__rightside_message_video_icon" onClick={handleVideoCall}/>

           <FontAwesomeIcon icon={faTrash} className="social2__rightside_message_trash_icon" onClick={handleDeleteConversation}/>

           </div>
         </div>

         {/*Notify dropdown*/}

         
            <div className="social2__call_dropdown2">
            <FontAwesomeIcon icon={faPhoneAlt} className="social2__rightside_message_audio_phone_icon" onClick={handleAudioCall}/>

            <FontAwesomeIcon icon={faVideo} className="social2__rightside_message_video_icon" onClick={handleVideoCall}/>

            <FontAwesomeIcon icon={faTrash} className="social2__rightside_message_trash_icon" onClick={handleDeleteConversation}/>

            </div>
        </UserCard>
      }

    </div>
    <div className="socials2__rightside_chat_container" style={{height: media.length > 0 ? 'calc(100% - 180px)' : '' }}>
      <div className="social2__chat_display" ref={refDisplay}>
        <button className="social2__message_load_more_btn" ref={pageEnd}>Load more </button>
          {
            data.map((msg, index)=>(
              <div key={index}>
                  {
                    msg.sender !== auth.user._id &&
                    <div className="social2__chat_row social2__other_message">
                        <MessageDisplay user={user} msg={msg}/>
                    </div>
                  }

                  {
                    msg.sender === auth.user._id &&
                    <div className="social2__chat_row social2__you_message">
                        <MessageDisplay user={auth.user} msg={msg}  data={data}/>
                    </div>

                  }
              </div>
            ))
          }

          {
            loadMedia &&
            <div className="social2__chat_row social2__you_message">
            <CircularProgress className="social2__chat_row social2__you_message" color="primary" size="20px"/>

            </div>
          }



      </div>
    </div>

    <div className="social2__show_media" style={{display: media.length>0 ? 'grid' : 'none'}}>
      {
        media.map((item, index) =>(
          <div key={index} id="social2__file_media">
            {
              item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))
            }
            <span onClick={()=> handleDeleteMedia(index)}>&times;</span>
          </div>
        ))
      }
    </div>

    <form className="social2__chat_input" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter you message... "
      value={text} onChange={e => setText(e.target.value)}
      />
      <Icons setContent={setText} content={text}/>
      <div className="social2__file_upload">
        <Image/>
        <input type="file" name="file" id="file" multiple accept="image/*,video/*" onChange={handleChangeMedia}/>
      </div>
      <button disabled={(text || media.length > 0 )? false : true} type="submit">
        <NearMe/>
      </button>
    </form>
    </>
  )
}

export default MessageRightSide
