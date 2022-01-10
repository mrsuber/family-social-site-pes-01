import React, {useState,useEffect, useRef} from 'react'
import './MessageLeftSide.css'
import {UserCard} from '../../../components'
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {getDataAPI} from '../../../utils/fetchData'
import {useHistory, useParams} from 'react-router-dom'
import {getConversations,MESS_TYPES} from '../../../redux/actions/messageAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle } from '@fortawesome/free-solid-svg-icons';



const MessageLeftSide = () => {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUser] = useState([])
  const {auth,message,online} = useSelector(state=>state)
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()

  const pageEnd = useRef()
  const [page, setPage] = useState(0)

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

    dispatch({type:MESS_TYPES.ADD_USER, payload:{...user, text:'', media:[]}})
    dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})

    // dispatch(addUser({user,message}))
    return history.push(`/message/${user._id}`)

  }

  const isActive = (user) => {

    if(id === user._id)return 'active'
    return ''

  }

  useEffect(() => {
    if(message.firstLoad)return
    dispatch(getConversations({auth}))
  },[dispatch,auth,message.firstLoad ])


  //load more

  useEffect(() => {
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        setPage(p => p + 1)
      }
    },{
      threshold: 0.1
    })
    observer.observe(pageEnd.current)
  },[setPage])

  useEffect(() => {
    if(message.resultUsers >= (page - 1) * 9 && page > 1){
      dispatch(getConversations({auth, page}))
    }
  },[message.resultUsers, page, auth, dispatch])


  //check user online - offline
  useEffect(()=>{
    if(message.firstLoad){
      dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
    }
  },[online, dispatch,message.firstLoad])

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
                    <UserCard user={user}  msg={true}>
                    {
                      user.online
                      ?<FontAwesomeIcon icon={faCircle} className="social2__online_dot active"/>
                      : auth.user.following.find(item => item._id === user._id) && <FontAwesomeIcon icon={faCircle} className="social2__online_dot"/>
                    }

                    </UserCard>
                </div>
              ))
            }
          </>
        }
        <button ref={pageEnd} className="social2__left_message_load_more_btn">Load More</button>
      </div>
    </>
  )
}

export default MessageLeftSide
