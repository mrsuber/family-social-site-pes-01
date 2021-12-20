import React from 'react'
import './RightSideBar.css'
import {UserCard,FollowBtn2} from '../../components'
import {useSelector, useDispatch} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRedo } from '@fortawesome/free-solid-svg-icons';
import {CircularProgress} from "@material-ui/core"
import {getSuggestions} from '../../redux/actions/suggestionsAction'


const RightSideBar = () => {

  const {auth, suggestions} = useSelector(state=>state)
  const dispatch = useDispatch()


  return (
    <div className="social2__suggestion_wrapper">
      <UserCard user={auth.user} />

      <div className="social2__suggestion">
        <h5>Suggestions for you</h5>
        {
          !suggestions.loading &&   <FontAwesomeIcon icon={faRedo} onClick={() => dispatch(getSuggestions(auth.token))}/>
        }

      </div>

      {
        suggestions.loading
        ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="10px"/>

        :<div className="social2__suggestion_users">
          {
            suggestions.users.map(user =>(
              <UserCard key={user._id} user={user}>
                <FollowBtn2 user={user} />
              </UserCard>
            ))
          }

        </div>
      }

      <div className="social2__suggestion_footer_wrapper" >

        <small className="social2__suggestion_footer">
          Know all about  <a href="https://msb-geneasocial.herokuapp.com/porfolio/home" target="_blank" rel="noreferrer">
            Mohamad Siysinyuy
            </a>
        </small>

        <small>
          &copy; 2021 Geneasocial From Mohamad Siysinyuy

        </small>
      </div>
    </div>
  )
}

export default RightSideBar
