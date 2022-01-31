import React,{useEffect, useState} from 'react'
import {Social2Header,Pagination,Table} from '../../../../components'
import './FamilyHome.css'
import axios from 'axios'


const FamilyHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage] =useState(1)
  const [postsPerPage] = useState(10)



  useEffect(() =>{
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')

      setPosts(res.data)
      setLoading(false);
    }

    fetchPost()
  },[])



//get current posts
const indexOfLastPost = currentPage * postsPerPage
const indexOfFirstPost = indexOfLastPost-postsPerPage
const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);


// change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)



  return (
    <>
    <Social2Header/>
    <section className="social2__main_family">


        <div className="table__constainer">
        <h1 className="text-primary mb-3">Display Phase one with pagination</h1>
        <Table posts={currentPosts} loading={loading}/>

        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

        </div>

    </section>
    </>
  )
}

export default FamilyHome
