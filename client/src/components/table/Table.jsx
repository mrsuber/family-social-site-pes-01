import React from 'react'
import './Table.css'


const Table = ({posts,loading}) => {
  if(loading){
    return <h2>Loading...</h2>
  }

  return (
    <ul className=" social2__family_list_group">
    {posts.map(post =>(
      <li key={post.id} className="social2__list_group_item">

      {post.title}
      </li>
    ))}
    </ul>
  )
}

export default Table
