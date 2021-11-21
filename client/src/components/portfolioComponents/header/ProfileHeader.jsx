import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'


const Header = ({color1,color2,color3,color4,color5}) => {
  return (
    <header className="pf__header">
      <div className="pf__container">
        <div className="pf__row pf__justify_content_between">
          <div>
          <Link to="/" className=""
          className={`pf__link pf__logo  ${color1===true? "pf__color1":""} ${color2===true? "pf__color2":""} ${color3===true? "pf__color3":""} ${color4===true? "pf__color4":""} ${color5===true? "pf__color5":""} ${color1===true? "pf__color12":""} ${color2===true? "pf__color22":""} ${color3===true? "pf__color32":""} ${color4===true? "pf__color42":""} ${color5===true? "pf__color52":""}`}

          >s</Link>
          </div>
          <div className="pf__hamburger_btn pf__outer_shadow pf__hover_in_shadow" >
          <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
