import React, {useState} from 'react'
import './MessageLeftSide.css'
import {UserCard} from '../../../components'
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {getDataAPI} from '../../../utils/fetchData'
import {useHistory, useParams} from 'react-router-dom'
import {addUser} from '../../../redux/actions/messageAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle } from '@fortawesome/free-solid-svg-icons';

const MessageLeftSide = () => {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUser] = useState([])
  const {auth,message} = useSelector(state=>state)
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()

  const handleSearch = async(e) =>{
    e.preventDefault()
    if(!search) return setSearchUser([]);

    try{

      const res = await  getDataAPI(`search?username=${search}`,auth.token)
      setSearchUser(res.data.users)
      if(res.data.users.length===0){
        dispatch({type:GLOBALTYPES.ALERT, payload:{error:"User not found"}})
      }


    }catch(err){
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})

    }
  }

  const handleAddUser = (user) =>{

    setSearch('')
    setSearchUser([])
    dispatch(addUser({user,message}))
    return history.push(`/message/${user._id}`)

  }

  const isActive = (user) => {
    
    if(id === user._id)return 'active'
    return ''

  }

  return (
    <>
      <form className="social2__message_header" onSubmit={handleSearch}>
        <input type="text" value={search} placeholder="Enter to Search...." onChange={e=>setSearch(e.target.value)}/>
        <button type="submit" id="social2__search_message_btn">Search</button>
      </form>

      <div className="social2__message_chat_list">
        {
          searchUsers.length !==0
          ?<>
              {
                searchUsers.map(user => (
                    <div key={user._id} className={`social2__message_user ${isActive(user)}`} onClick={()=>handleAddUser(user)}>
                        <UserCard user={user}/>
                    </div>
                ))
              }

          </>
          :<>
            {
              message.users.map(user => (
                <div key={user._id} className={`social2__message_user ${isActive(user)}`} onClick={()=>handleAddUser(user)}>
                    <UserCard user={user}>
                    <FontAwesomeIcon icon={faCircle} className="social2__online_dot"/>
                    </UserCard>
                </div>
              ))
            }
          </>
        }

      </div>
    </>
  )
}

export default MessageLeftSide
