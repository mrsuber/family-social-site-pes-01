import React,{useEffect} from 'react'
import './HomePage.css'
import {Social2Header,Status,Posts,RightSideBar} from '../../../components'
import post from '../../../images/blog-1.jpg'
import profile from '../../../images/me.webp'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts} from '../../../redux/actions/postAction'
import {getSuggestions} from '../../../redux/actions/suggestionsAction'
import {getNotifies} from '../../../redux/actions/notifyAction'

import {CircularProgress} from "@material-ui/core"



const HomePage = () => {
  const {auth, homePosts} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(auth.token){
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  },[dispatch,auth.token])

  return (
    <>
    <div className="social2__homepage-body" >
    <Social2Header/>
    <section className="social2__main">
        <div className="social2__mainWrapper">
          <div className="social2__left-col">
          {/*begining of status*/}
          <Status profile={profile} />
          {/*end of status*/}

          {/*begining of status*/}


          {
            homePosts.loading
            ?<CircularProgress className="social2__profile_circularLoader" color="primary" size="15px"/>
            :(homePosts.result ===0 && homePosts.posts.length===0)
                ?<h2 className="social2__no_post_title">No Post</h2>
                :<Posts profile={profile} post={post} />
          }



          {/*end of status*/}






          </div>
          <div className="social2__right-col">
            <RightSideBar />



          </div>
        </div>
    </section>
</div>
    </>
  )
}

export default HomePage
