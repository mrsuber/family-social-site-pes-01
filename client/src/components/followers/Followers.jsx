import React from 'react'
import './Followers.css'
import {UserCard, FollowBtn} from '../../components'
import {useSelector} from 'react-redux'


const Followers = ({ users,setShowFollowers}) => {
  // console.log(users)
  const { auth } = useSelector(state => state)
  return (
    <div className="social2__follower_container">
    <div className="social2__follower_box">
      <h5 className="social2__follower_tittle">Followers</h5>

      {
        users.map(user => (

          <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
            {
              auth.user._id !== user._id && <FollowBtn user={user}/>
            }
          </UserCard>
        ))
      }
      <div className="social2__close" onClick={()=>setShowFollowers(false)}>&times;</div>
    </div>
    </div>
  )
}

export default Followers
