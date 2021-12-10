import React, {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Avatar,EditProfile,FollowBtn,Following,Followers} from '../../components'
import './Info.css'
import {getProfileUsers} from '../../redux/actions/profileAction'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'

const Info = () => {
  const {id} = useParams()
  const {auth,profile} = useSelector(state => state)

  const dispatch = useDispatch()

  const [userData,setUserData] = useState([])
  const [onEdit,setOnEdit]= useState(false)
  const [showFollowers, setShowFollowers]=useState(false)
  const [showFollowing, setShowFollowing]=useState(false)

  useEffect(()=>{
    if(id===auth.user._id){
      setUserData([auth.user])
    }else{
      dispatch(getProfileUsers({users: profile.users, id,auth}))
      const newData = profile.users.filter(user => user._id=== id)
      setUserData(newData)
    }
  },[id,auth,dispatch,profile.users])

  useEffect(() =>{
    if(showFollowers || showFollowing || onEdit){
      dispatch({type:GLOBALTYPES.MODAL,payload:true})
    }else{
      dispatch({type:GLOBALTYPES.MODAL,payload:false})
    }
  },[showFollowers,showFollowing,onEdit,dispatch])

  console.log(userData)

  return (

    <div className="social2__info-wrapper">
    {
        userData.map(user =>(

          <div className="social2__info-container" key={user._id}>
            <Avatar src={user.profilePic} size="social2__super-profileImage" />
            <div className="social2__info_content">
              <div className="social2__info_content_title">
              <h2>{user.fullname}</h2>

                {
                  user._id === auth.user._id
                  ?<button className="social2__info_content_title_edit_btn" onClick={() => setOnEdit(true)}>Edit Profile</button>
                  :<FollowBtn user={user}/>
                }
               </div>
               <div className="social2__info_follower_wrapper">
                <span className="social2__info_follower" onClick={() =>setShowFollowers(true)}>
                  {user.followers.length} Followers
                </span>

                <span className="social2__info_following" onClick={()=>setShowFollowing(true)}>
                  {user.following.length} Following
                </span>
               </div>
               <h6>Username: {user.fullname}</h6>
                <h6 className="social2__info_text"> Contact Tel: {user.mobile}</h6>
               <p className="social2__address">Address: {user.address}</p>
               <p className="social2__address">Gender: {user.gender}</p>
               <h6>Contact Email: {user.email}</h6>
               Website: <a href={user.website ? user.website : "#"} target="_blank" rel="noreferrer" className> {user.website ? user.website : "none"}</a>
               <p>Story: {user.story}</p>
            </div>

            {onEdit && <EditProfile setOnEdit={setOnEdit}/>}

            {showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers}/> }
            {showFollowing && <Following  users={user.following} setShowFollowing={setShowFollowing}/> }
          </div>
        ))
    }

    </div>
  )
}

export default Info
