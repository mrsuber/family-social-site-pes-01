import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Posts.css'
import {PorfilePostCard,LoadMoreBtn} from '../../components'
import {CircularProgress} from "@material-ui/core"
import {getDataAPI} from '../../utils/fetchData'
import { POST_TYPES} from '../../redux/actions/postAction'
const Posts = () => {
  const { homePosts,auth } = useSelector(state=>state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)



  const handleloadMore = async() =>{
    setLoad(true)
    const res = await getDataAPI(`posts/?limit=${homePosts.page * 9}`, auth.token)

    dispatch({
      type:POST_TYPES.GET_POSTS,
       payload: {...res.data, page:homePosts.page + 1}

     })

    setLoad(false)
  }



  return (
    <div className="social2__posts2">


    {
      homePosts.posts.map(post =>(

        <PorfilePostCard post={post} key={post._id}/>

      ))
    }

    {
      load && <CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
    }

    {
         <LoadMoreBtn result={homePosts.result} page={homePosts.page} load={load} handleloadMore={handleloadMore} />
    }

    </div>
  )
}

export default Posts
