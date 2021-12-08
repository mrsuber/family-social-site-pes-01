import './Search.css'
import React,{useState} from 'react'
import {Search} from "@material-ui/icons"
import {useSelector, useDispatch } from 'react-redux'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'
import {Link} from 'react-router-dom'
import {UserCard} from '../../components'
import {CircularProgress} from "@material-ui/core"

const Searchs = () => {
  const [search,setSearch]=useState('')
  const [users,setUsers] = useState([])

  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)


const handleSearch = async (e) =>{
  e.preventDefault()
  if(!search) return;

  try{
    setLoad(true)
    const res = await  getDataAPI(`search?username=${search}`,auth.token)
    setUsers(res.data.users)
    if(res.data.users.length===0){
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:"User not found"}})
    }

    setLoad(false)

  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})

  }
}


  const handleClose = () =>{
  setSearch('')
  setUsers([])
  }
  return (
    <>
    <span>

    <form className="social2__search_form" onSubmit={handleSearch}>
      <input
      className="social2__search-input"
      type="text"
      name='search'
      id="search"
      value={search}
      title="Enter to Search"
      onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))} />

      <div className="social2__search_icon" style={{opacity: search ? 0 : 0.3}}>
        <span><Search /></span>
        <span>Enter to Search</span>
      </div>
      <div className="social2__close_search" onClick={handleClose} style={{opacity: users.length===0 ? 0 : 0.7}} >&times;</div>
      <button type="submit" style={{display:'none'}}>Search</button>
      {load && <CircularProgress className="social2__circularLoader" color="primary" size="15px"/>}
      <div className="social2__search-users">
        {
          search && users.map(user=>(

            <Link key={user._id} to={`/profile/${user._id}`} className="social2__link" onClick={handleClose}>
                <UserCard user={user} border="social2__search-border" />
            </Link>
          ))
        }
      </div>
    </form>

    </span>

    </>
  )
}

export default Searchs
