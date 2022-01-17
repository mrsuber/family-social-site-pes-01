import React, {useState, useEffect, useRef,useCallback} from 'react'
import "./CallModal.css"
import {useSelector, useDispatch} from 'react-redux'
import {Avatar} from '../../components'
import {CallEnd,Videocam,Call} from '@material-ui/icons'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'
import {addMessage} from '../../redux/actions/messageAction'
import {aud2} from "../../audio"


const CallModal = () => {
  const {call,auth,peer,socket} = useSelector(state => state)
  const dispatch = useDispatch()

  const [hours, setHours] = useState(0)
  const [mins, setMins] = useState(0)
  const [second, setSecond] = useState(0)

  const [total, setTotal] = useState(0)

  const [answer, setAnswer] = useState(false)
  const [tracks, setTracks] = useState(null)

  const [newCall, setNewCall] = useState(null)


  const youVideo = useRef()
  const otherVideo = useRef()
  //set Time
  useEffect(() => {
    const setTime = ()=>{
      setTotal(t => t + 1)
      setTimeout(setTime, 1000)
    }
    setTime()

    return ()=>setTotal(0)
  },[])

  useEffect(()=>{
    setSecond(total%60)
    setMins(parseInt(total/60))
    setHours(parseInt(total/3600))
  },[total])




//end call

  const addCallMessage = useCallback((call, times, disconnect)=>{
    if(call.recipient !== auth.user._id || disconnect){
      const msg ={
        sender:call.sender,
        recipient:call.recipient,
        text:'',
        media:[],
        call: {video: call.video, times},
        createdAt:new Date().toISOString()
      }
      dispatch(addMessage({msg, auth, socket}))
    }

  },[auth, dispatch,socket])



  const handleEndCall = ()=>{
    tracks && tracks.forEach(track => track.stop())
    if(newCall) newCall.close()
    let times = answer ? total : 0
    socket.emit('endCall', {...call,times})

    addCallMessage(call, times)
    dispatch({type:GLOBALTYPES.CALL, payload:null})

  }

  useEffect(()=>{
    if(answer){
      setTotal(0)
    }else{
      const timer = setTimeout(()=>{
        // tracks && tracks.forEach(track => track.stop())

        socket.emit('endCall', {...call, times:0})
        addCallMessage(call, 0)
        dispatch({type:GLOBALTYPES.CALL, payload:null})
      },15000)

      return () => clearTimeout(timer)
    }

  },[dispatch,answer,call,socket,addCallMessage])

  useEffect(()=>{
    socket.on('endCallToClient', data =>{

      tracks && tracks.forEach(track => track.stop())
      if(newCall) newCall.close()
      addCallMessage(data, data.times)
      dispatch({ type:GLOBALTYPES.CALL, payload:null})
    })
    return () => socket.off('endCallToClient')
  },[socket,dispatch,tracks,addCallMessage,newCall])

//stream Media
const openStream = (video) => {
  const config = {audio:true, video}
  return navigator.mediaDevices.getUserMedia(config)
}

const playStream = (tag, stream) =>{
  let video = tag;
  video.srcObject = stream;
  video.play()
}


//answer call
  const handleAnswer = ()=>{
      openStream(call.video).then(stream => {
        playStream(youVideo.current, stream)
        const track = stream.getTracks()
        setTracks(track)

        const newCall = peer.call(call.peerId, stream);
        newCall.on('stream', function(remoteStream){
          playStream(otherVideo.current, remoteStream)
        })
          setAnswer(true)
          setNewCall(newCall)
      })


  }

  useEffect(()=>{
    peer.on('call', newCall => {
      openStream(call.video).then(stream =>{
        if(youVideo.current){
          playStream(youVideo.current, stream)
        }
          const track = stream.getTracks()
          setTracks(track)

          // const newCall = peer.call(call.peerId, stream);
          newCall.answer(stream)

          newCall.on('stream', function(remoteStream){
            if(otherVideo.current){
                playStream(otherVideo.current, remoteStream)
            }

          })
            setAnswer(true)
            setNewCall(newCall)

      })
    })
    return () => peer.removeListener('call')
  },[peer, call.video])


  //Disconnect
  useEffect(()=>{
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach(track => track.stop())
        if(newCall) newCall.close()
        let times = answer ? total : 0
        addCallMessage(call, times, true)
      dispatch({type:GLOBALTYPES.CALL, payload:null})
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:`${call.username} disconnected`}})
    })

    return () => socket.off("callerDisconnect")
  },[socket,tracks,dispatch, call,addCallMessage,answer,total,newCall])


//play pause audio
  const playAudio = (newAudio) =>{
    newAudio.play()
  }

  const pauseAudio = (newAudio) =>{
    newAudio.pause()
    newAudio.currentTime = 0
  }

  useEffect(()=>{
  let newAudio = new Audio(aud2)


  if(answer){
    pauseAudio(newAudio)
  }else{
    playAudio(newAudio)
  }

  return () => pauseAudio(newAudio)
},[answer])


  return (
    <div className="social2__call_modal" >

    <div className="social2__call_box" style={{ display: (answer && call.video) ? 'none' : 'flex' }}>
        <div className="social2__call_box_inner">
          <Avatar src={call.profilePic} size="social2__super-profileImage" />
          <h4>{call.username}</h4>
          <h6>{call.fullname}</h6>
          {
            answer
            ?<div>
                <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                <span>:</span>
                <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
                <span>:</span>
                <span>{second.toString().length < 2 ? '0' + second : second}</span>
            </div>
            :<div>
              {
                call.video
                ? <span>calling video...</span>
                :<span>calling audio...</span>
              }
            </div>
          }

        </div>

        {
          !answer &&
          <div className="social2__timer">
            <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
            <small>:</small>
            <small>{second.toString().length < 2 ? '0' + second : second}</small>
          </div>
        }



        <div className="social2__call_menu">
        <span onClick={handleEndCall}>
            <CallEnd className="social2__end_call_icon" />
        </span>
          {
            (call.recipient === auth.user._id && !answer) &&   <>
                {
                  call.video
                  ?<span onClick={handleAnswer}><Videocam className="social2__end_call2_icon" /></span>
                  :<span onClick={handleAnswer}><Call className="social2__end_call2_icon "/></span>
                }
              </>
          }

        </div>


      </div>

      <div className="social2__show_video" style={{ opacity: (answer && call.video) ? '1' : '0' }}>
        <video ref={youVideo} className="social2__you_video" playsInline muted/>
        <video ref={otherVideo} className="social2__other_video" playsInline/>

        <div className="social2__time_video">
            <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
            <span>:</span>
            <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
            <span>:</span>
            <span>{second.toString().length < 2 ? '0' + second : second}</span>
        </div>

        <span onClick={handleEndCall} className="social__end_call2">
            <CallEnd className="social2__end_call_icon " />
        </span>

      </div>


    </div>
  )
}

export default CallModal
