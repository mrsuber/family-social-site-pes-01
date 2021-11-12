import './Search.css'
import React,{useState,useEffect} from 'react'
import {Search} from "@material-ui/icons"
import {useSelector, useDispatch } from 'react-redux'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'

const Searchs = () => {
  const [search,setSearch]=useState('')
  const [users,setUsers] = useState([])

  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(() =>{
    if(search && auth.token){
      getDataAPI(`search?username=${search}`,auth.token)
      .then(res=>setUsers(res.data.users))
      .catch(err => {
        dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
      })
    }
  },[search,auth.token])
  return (
    <>
    <span>

    <form className="social2__search_form">
      <input
      type="text"
      name='search'
      id="search"
      value={search}
      onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))} />

      <div className="social2__search_icon" style={{opacity: search ? 0 : 0.3}}>
        <span><Search /></span>
        <span>Search</span>
      </div>
      <div className="social2__close_search">&times;</div>
    </form>
    </span>

    </>
  )
}

export default Searchs
