import React,{useEffect} from 'react'
import './Preloader.css'


const Preloader = () => {

useEffect(()=>{
  window.addEventListener("load", ()=>{

  })
},[])

  return (
    <div className="pf__preloader">
    <div className="pf__box">
      <div></div><div></div><div></div>
    </div>
    </div>
  )
}

export default Preloader
