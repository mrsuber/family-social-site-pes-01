import React from 'react'
import './Following.css'
import {UserCard, FollowBtn} from '../../components'
import {useSelector} from 'react-redux'


const Following = ({ users,setShowFollowing}) => {
  console.log(users)
  const { auth } = useSelector(state => state)
  return (
    <div className="social2__follower_container">
    <div className="social2__follower_box">
      <h5 className="social2__follower_tittle">Following</h5>

      {
        users.map(user => (

          <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
            {
              auth.user._id !== user._id && <FollowBtn user={user}/>
            }
          </UserCard>
        ))
      }
      <div className="social2__close" onClick={()=>setShowFollowing(false)}>&times;</div>
    </div>
    </div>
  )
}

export default Following
