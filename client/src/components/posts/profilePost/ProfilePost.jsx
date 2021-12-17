import React,{useState, useEffect} from 'react'
import './ProfilePost.css'
import {PostThumb,LoadMoreBtn} from '../../../components'
import {CircularProgress} from "@material-ui/core"
import {getDataAPI} from '../../../utils/fetchData'
import { PROFILE_TYPES} from '../../../redux/actions/profileAction'

const ProfilePost = ({auth,profile,dispatch,id}) => {

  const [posts, setPosts] = useState([])
  const [result , setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)


  useEffect(()=>{
    profile.posts.forEach(data => {
      if((data._id)===id){
        setPosts(data.posts)
        setResult(data.result)
        setPage(data.page)
      }
    });

  },[  profile.posts,id])

  const handleloadMore = async() =>{
    setLoad(true)
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
    const newData = {...res.data, page:page + 1, _id: id}
    dispatch({type:PROFILE_TYPES.UPDATE_POST, payload: newData})
    setLoad(false)
  }

  return (

    <div className="social2__profile_thumb_wrapper">

    <PostThumb posts={posts} result={result}/>
    <div className="social2__profile_thumb_load_btn">
    {
      load && <CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
    }

    {
         <LoadMoreBtn result={result} page={page} load={load} handleloadMore={handleloadMore} />
    }

    </div>
    </div>
  )
}

export default ProfilePost
