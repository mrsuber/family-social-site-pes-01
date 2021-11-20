import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <header className="pf__header">
      <div className="pf__container">
        <div className="pf__row pf__justify_content_between">
          <div>
          <Link to="/" className="pf__link pf__logo">s</Link>
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
