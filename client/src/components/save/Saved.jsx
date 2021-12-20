
import './Saved.css'
import React,{useState, useEffect} from 'react'

import {PostThumb,LoadMoreBtn} from '../../components'
import {CircularProgress} from "@material-ui/core"
import {getDataAPI} from '../../utils/fetchData'
import { GLOBALTYPES} from '../../redux/actions/globlaTypes'

const Saved = ({auth,dispatch}) => {

  const [savePosts, setSavePosts] = useState([])
  const [result , setResult] = useState(9)
  const [page, setPage] = useState(2)
  const [load, setLoad] = useState(false)


  useEffect(()=>{
    setLoad(true)
    getDataAPI('getSavePost',auth.token)
    .then(res =>{
      setSavePosts(res.data.savePosts)
      setResult(res.data.result)
      setLoad(false)
    })
    .catch(err => {
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
    })
    return ()=> setSavePosts([])
  },[auth.token, dispatch])

  const handleloadMore = async() =>{
    setLoad(true)
    const res = await getDataAPI(`getSavePost?limit=${page * 9}`, auth.token)
    setSavePosts(res.data.savePosts)
    setResult(res.data.result)
    setPage(page + 1)
    setLoad(false)
  }

  return (

    <div className="social2__profile_thumb_wrapper">

    <PostThumb posts={savePosts} result={result}/>
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

export default Saved
