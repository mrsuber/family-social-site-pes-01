import React,{useEffect,useState} from 'react'
import './Profile.css'
import {Social2Header, Info,ProfilePost,Saved} from '../../../components'
import { useSelector,useDispatch} from 'react-redux'
import {CircularProgress} from "@material-ui/core"
import {getProfileUsers} from '../../../redux/actions/profileAction'
import {useParams} from 'react-router-dom'

import {getPosts} from '../../../redux/actions/postAction'
import {getSuggestions} from '../../../redux/actions/suggestionsAction'
import {getNotifies} from '../../../redux/actions/notifyAction'



const Profile = () => {
  const {profile,auth} = useSelector(state=>state)
  const dispatch = useDispatch()
  const {id} = useParams()
  const [saveTab, setSaveTab] = useState(false)
  useEffect(()=>{
    if(profile.ids.every(item =>item !== id)){
    dispatch(getProfileUsers({ id,auth}))
  }

},[id,auth,dispatch,profile.ids])

useEffect(()=>{
  if(auth.token){
    dispatch(getPosts(auth.token))
    dispatch(getSuggestions(auth.token))
    dispatch(getNotifies(auth.token))
  }
},[dispatch,auth.token])

useEffect(()=>{
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") { }
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") { }
    });
  }
},[])
  return (
    <>
    <Social2Header/>
    <section className="social2__profile-section" >

    <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>

    {
      auth.user._id === id &&
      <div className="social2__porfile_tab">
        <button className={saveTab ? '' : 'social2__profile_active'} onClick={()=> setSaveTab(false)}>Posts</button>
        <button className={saveTab ? 'social2__profile_active' : ''} onClick={()=> setSaveTab(true)}>Saved</button>
      </div>
    }

    {
      profile.loading
      ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
      :<>
        {
          saveTab
          ?<Saved auth={auth} dispatch={dispatch} />
          :<ProfilePost auth={auth} profile={profile} dispatch={dispatch} id={id} />
        }

      </>
    }


    </section>

    </>
  )
}

export default Profile
