import React,{useEffect} from 'react'
import './Profile.css'
import {Social2Header, Info,ProfilePost} from '../../../components'
import { useSelector,useDispatch} from 'react-redux'
import {CircularProgress} from "@material-ui/core"
import {getProfileUsers} from '../../../redux/actions/profileAction'
import {useParams} from 'react-router-dom'



const Profile = () => {
  const {profile,auth} = useSelector(state=>state)
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(()=>{
    if(profile.ids.every(item =>item !== id)){
    dispatch(getProfileUsers({ id,auth}))
  }

},[id,auth,dispatch,profile.ids])
  return (
    <>
    <Social2Header/>
    <section className="social2__profile-section" >

    <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>


    {
      profile.loading
      ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
      :<ProfilePost auth={auth} profile={profile} dispatch={dispatch} id={id} />
    }


    </section>

    </>
  )
}

export default Profile
