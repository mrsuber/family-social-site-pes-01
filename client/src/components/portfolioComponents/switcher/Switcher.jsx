import React,{useEffect} from 'react'
import './Switcher.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog,faMoon} from '@fortawesome/free-solid-svg-icons';

const Switcher = ({setActivateStyle}) => {
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
  },[])
  return (
    <div className="pf__style_switcher pf__outer_shadow">
      <div className="pf__style_switcher_toggler pf__s_icon pf__outer_shadow pf__hover_in_shadow">
        <FontAwesomeIcon icon={faCog} className="pf__setting"/>
      </div>
      <div className="pf__day_night pf__s_icon pf__outer_shadow pf__hover_in_shadow">
      <FontAwesomeIcon icon={faMoon} />
      </div>
      <h4>Theme Colors</h4>
      <div className="pf__colors">
      <span className="pf__color_1" onClick={setActivateStyle('color_1')}></span>
      <span className="pf__color_2" onClick={setActivateStyle('color_2')}></span>
      <span className="pf__color_3" onClick={setActivateStyle('color_3')}></span>
      <span className="pf__color_4" onClick={setActivateStyle('color_4')}></span>
      <span className="pf__color_5" onClick={setActivateStyle('color_5')}></span>
      </div>
    </div>
  )
}

export default Switcher
