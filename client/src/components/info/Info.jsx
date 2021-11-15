import React, {useEffect,useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Avatar,EditProfile,FollowBtn} from '../../components'
import './Info.css'
import {getProfileUsers} from '../../redux/actions/profileAction'
const Info = () => {
  const {id} = useParams()
  const {auth,profile} = useSelector(state => state)

  const dispatch = useDispatch()

  const [userData,setUserData] = useState([])
  const [onEdit,setOnEdit]= useState(false)

  useEffect(()=>{
    if(id===auth.user._id){
      setUserData([auth.user])
    }else{
      dispatch(getProfileUsers({users: profile.users, id,auth}))
      const newData = profile.users.filter(user => user._id=== id)
      setUserData(newData)
    }
  },[id,auth,dispatch,profile.users])

  return (
    <div className="social2__info-wrapper">
    {
        userData.map(user =>(
          <div className="social2__info-container" key={user._id}>
            <Avatar src={user.profilePic} size="social2__super-profileImage" />
            <div className="social2__info_content">
              <div className="social2__info_content_title">
                <h2>{user.username}</h2>
                {
                  user._id === auth.user._id
                  ?<button className="social2__info_content_title_edit_btn" onClick={() => setOnEdit(true)}>Edit Profile</button>
                  :<FollowBtn/>
                }
               </div>
               <div className="social2__info_follower_wrapper">
                <span className="social2__info_follower">
                  {user.followers.length} Followers
                </span>

                <span className="social2__info_following">
                  {user.following.length} Following
                </span>
               </div>

               <h6>{user.fullname} {user.mobile}</h6>
               <p className="social2__address">{user.address}</p>
               <h6>{user.email}</h6>
               <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a>
               <p>{user.story}</p>
            </div>

            {onEdit && <EditProfile setOnEdit={setOnEdit}/>}
          </div>
        ))
    }

    </div>
  )
}

export default Info
