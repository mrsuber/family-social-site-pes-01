import React,{useEffect} from 'react'
import './Preloader.css'


const Preloader = () => {

useEffect(()=>{
  window.addEventListener("load", ()=>{
    document.querySelector(".pf__preloader").classList.add("pf__fade_out");
    setTimeout(()=>{
      document.querySelector(".pf__preloader").style.display="none";

    },600)
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
