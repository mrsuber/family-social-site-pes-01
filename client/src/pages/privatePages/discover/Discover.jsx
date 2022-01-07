import React,{useState, useEffect} from 'react'
import './Discover.css'
import {Social2Header,PostThumb,LoadMoreBtn} from '../../../components'
import {useSelector, useDispatch} from 'react-redux'
import {getDiscoverposts, DISCOVER_TYPES} from '../../../redux/actions/discoverAction'
import {CircularProgress} from "@material-ui/core"
import {getDataAPI} from '../../../utils/fetchData'


const Discover = () => {
  const {auth,discover} = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)


  useEffect(()=>{
    if(!discover.firstLoad){
      dispatch(getDiscoverposts(auth.token))
    }

  },[dispatch,auth.token,discover.firstLoad])

  const handleloadMore = async()=>{
    setLoad(true)
    const res = await getDataAPI(`post_discover?num=${discover.page * 9}`,auth.token)
  
    dispatch({type: DISCOVER_TYPES.UPDATE_POST, payload:res.data})
    setLoad(false)
  }
  return (
    <>
    <Social2Header />
      <section className="social2__discover-main">
    {
      discover.loading
      ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
      :<PostThumb posts={discover.posts} result={discover.result} />
    }

      {
        load && <CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
      }

      {
          !discover.loading &&   <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleloadMore={handleloadMore} />
      }


    </section>
    </>
  )
}

export default Discover
