import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './PostDetails.css'
import {Social2Header} from '../../../components'
import {getPost} from '../../../redux/actions/postAction'


const PostDetails = () => {
  const {auth, detailPost} = useSelector(state=>state)
  const {id} = useParams()
  const [post, setPost]= useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPost({detailPost, id,auth}))
    if(detailPost.length > 0){
      const newArr = detailPost.filter(post => post._id === id)
        setPost(newArr)

    }
  },[detailPost, dispatch, id,auth])
  return (
    <>
    <Social2Header/>
    <section className="social2__post_details-section" >

    PostDetails{id}

    </section>
    </>
  )
}

export default PostDetails
