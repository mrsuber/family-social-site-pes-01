import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <header className="pf__header">
      <div className="pf__container">
        <div className="pf__row pf__justify_content_between">
          <div>
          <a  href="#home" className="pf__link pf__logo pf__link_item"

          >s</a>
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
