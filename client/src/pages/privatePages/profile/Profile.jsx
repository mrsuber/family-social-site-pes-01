import React from 'react'
import './Profile.css'
import {Social2Header, Info,ProfilePost} from '../../../components'
import { useSelector} from 'react-redux'
import {CircularProgress} from "@material-ui/core"




const Profile = () => {
  const {profile} = useSelector(state=>state)
  return (
    <>
    <Social2Header/>
    <section className="social2__profile-section" >

    {
      profile.loading
      ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
      :<Info />
    }

      <ProfilePost/>
    </section>

    </>
  )
}

export default Profile
