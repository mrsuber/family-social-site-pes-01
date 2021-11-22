import React,{useEffect,useState} from 'react'
import './Switcher.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog,faMoon,faSun} from '@fortawesome/free-solid-svg-icons';

const Switcher = ({setColor1,setColor2,setColor3,setColor4,setColor5}) => {
  const [dark,setDark]=useState(false)

  function toggleDarkMood(){
    setDark(!dark)
    if(dark===true){
      if(document.querySelector(".pf__body").classList.contains("pf__dark")){
        document.querySelector(".pf__body").classList.remove("pf__dark")
      }
    }else{
      document.querySelector(".pf__body").classList.add("pf__dark")
    }

  }


  useEffect(()=>{
    const styleSwitcherToggler = document.querySelector(".pf__style_switcher_toggler")
    styleSwitcherToggler.addEventListener("click",()=>{
      document.querySelector(".pf__style_switcher").classList.toggle("pf__open")
    })

    //hide style switcher on scroll
    window.addEventListener("scroll",()=>{
      if(document.querySelector(".pf__style_switcher").classList.contains("pf__open")){
        document.querySelector(".pf__style_switcher").classList.remove("pf__open")
      }
    })
    /*---------------------------------theme colors-------------------------------------*/
    window.addEventListener("load",()=>{
      if(document.querySelector(".pf__body").classList.contains("pf__dark")){
        console.log("dark state if",dark)
      }else{
        console.log("dark state is off",dark)
      }
    })

  },[])
  return (
    <div className="pf__style_switcher pf__outer_shadow">
      <div className="pf__style_switcher_toggler pf__s_icon pf__outer_shadow pf__hover_in_shadow">
        <FontAwesomeIcon icon={faCog} className="pf__setting"/>
      </div>
      <div className="pf__day_night pf__s_icon pf__outer_shadow pf__hover_in_shadow"onClick={toggleDarkMood}>
    {dark===true? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}

      </div>
      <h4>Theme Colors</h4>
      <div className="pf__colors">
      <span className="pf__color_1" onClick={setColor1}></span>
      <span className="pf__color_2" onClick={setColor2}></span>
      <span className="pf__color_3" onClick={setColor3}></span>
      <span className="pf__color_4" onClick={setColor4}></span>
      <span className="pf__color_5" onClick={setColor5}></span>
      </div>
    </div>
  )
}

export default Switcher
