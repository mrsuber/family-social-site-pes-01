import React, {useState, useEffect, useRef} from 'react'
import "./CallModal.css"
import {useSelector, useDispatch} from 'react-redux'
import {Avatar} from '../../components'
import {CallEnd,Videocam,Call} from '@material-ui/icons'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'

const CallModal = () => {
  const {call,auth,peer,socket} = useSelector(state => state)
  const dispatch = useDispatch()

  const [hours, setHours] = useState(0)
  const [mins, setMins] = useState(0)
  const [second, setSecond] = useState(0)

  const [total, setTotal] = useState(0)

  const [answer, setAnswer] = useState(false)
  const [tracks, setTracks] = useState(null)

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
  const handleEndCall = ()=>{
    dispatch({type:GLOBALTYPES.CALL, payload:null})
    socket.emit('endCall', call)
  }

  useEffect(()=>{
    if(answer){
      setTotal(0)
    }else{
      const timer = setTimeout(()=>{
        dispatch({type:GLOBALTYPES.CALL, payload:null})
      },15000)

      return () => clearTimeout(timer)
    }

  },[dispatch,answer])

  useEffect(()=>{
    socket.on('endCallToClient', data =>{
      console.log("endcall data",data)
      dispatch({ type:GLOBALTYPES.CALL, payload:null})
    })
    return () => socket.off('endCallToClient')
  },[socket,dispatch])

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

      })
    })
    return () => peer.removeListener('call')
  },[peer, call.video])

  return (
    <div className="social2__call_modal">

    <div className="social2__call_box">
        <div className="social2__call_box_inner">
          <Avatar src={call.profilePic} size="social2__super-profileImage" />
          <h4>{call.username}</h4>
          <h6>{call.fullname}</h6>
          {
            answer
            ?<div>
                <span>{hours.toString().length < 2 ? '0' + mins : mins}</span>
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

        <div className="social2__show_video" style={{
          opacity: (answer && call.video) ? '1' : '0'
        }}>
          <video ref={youVideo} className="social2__you_video"/>
          <video ref={otherVideo} className="social2__other_video" />

          <div className="social2__time_video">
              <span>{hours.toString().length < 2 ? '0' + mins : mins}</span>
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

    </div>
  )
}

export default CallModal
