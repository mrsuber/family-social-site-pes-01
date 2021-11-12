import React,{useState} from 'react'
import './Search.css'
import {Search} from "@material-ui/icons"
const Searchs = () => {
  const [search,setSearch]=useState('')
  return (
    <>
    <span>
    {/*<form>
    <input
    type="text"
    className="social2__search-box"
    placeholder="search"
    name='search'
    id="search"
    value={search}
    onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))} />

    </form>*/}
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
