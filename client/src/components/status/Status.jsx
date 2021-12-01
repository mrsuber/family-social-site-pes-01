import React from 'react'
import './Status.css'
import {Avatar1,StatusModal} from '../../components'
import {useSelector,useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'

const Status = ({profile}) => {
  const {auth,status} = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <>
    {status && <StatusModal />}
    <div className="social2__post_status_wrapper">
    <div className="social2__post_status_profile-pic">
      <img src={auth.user.profilePic} alt="profile" />
    </div>
      <button className="social2__status_btn"
      onClick={()=>dispatch({type:GLOBALTYPES.STATUS, payload:true})}>
        {auth.user.username}, What are you thinking?
      </button>
    </div>

    <div className="social2__status-wrapper">

        <Avatar1 profile={profile} username="mrsuber1"/>
        <Avatar1 profile={profile} username="mrsuber2"/>
        <Avatar1 profile={profile} username="mrsuber3"/>
        <Avatar1 profile={profile} username="mrsuber4"/>
        <Avatar1 profile={profile} username="mrsuber5"/>
        <Avatar1 profile={profile} username="mrsuber6"/>
        <Avatar1 profile={profile} username="mrsuber7"/>




    </div>
    </>

  )
}

export default Status
