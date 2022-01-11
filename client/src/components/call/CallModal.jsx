import React, {useState, useEffect} from 'react'
import "./CallModal.css"
import {useSelector, useDispatch} from 'react-redux'
import {Avatar} from '../../components'
import {CallEnd,Videocam,Call} from '@material-ui/icons'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'

const CallModal = () => {
  const {call} = useSelector(state => state)
  const dispatch = useDispatch()


  const [mins, setMins] = useState(0)
  const [second, setSecond] = useState(0)

  const [total, setTotal] = useState(0)

  const [answer, setAnswer] = useState(false)
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
  },[total])

//end call
  const handleEndCall = ()=>{
    dispatch({type:GLOBALTYPES.CALL, payload:null})
  }

  useEffect(()=>{
    if(answer){
      setTotal(0)
    }
    const timer = setTimeout(()=>{
      dispatch({type:GLOBALTYPES.CALL, payload:null})
    },15000)

    return () => clearTimeout(timer)
  },[dispatch])

  const handleAnswer = ()=>{
      setAnswer(true)
  }

  return (
    <div className="social2__call_modal">

    <div className="social2__call_box">
        <div className="social2__call_box_inner">
          <Avatar src={call.profilePic} size="social2__super-profileImage" />
          <h4>{call.username}</h4>
          <h6>{call.fullname}</h6>
          <div>
            {
              call.video
              ? <span>calling video...</span>
              :<span>calling audio...</span>
            }
          </div>
        </div>

        <div className="social2__timer">
          <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
          <small>:</small>
          <small>{second.toString().length < 2 ? '0' + second : second}</small>
        </div>

        <div className="social2__call_menu">
        <span onClick={handleEndCall}>
            <CallEnd className="social2__end_call_icon" />
        </span>

          <>
            {
              call.video
              ?<span onClick={handleAnswer}><Videocam className="social2__end_call2_icon" /></span>
              :<span onClick={handleAnswer}><Call className="social2__end_call2_icon "/></span>
            }
          </>
        </div>
    </div>

    </div>
  )
}

export default CallModal
