import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="pf__body">
    <header className="pf__header">
      <div className="pf__container">
        <div className="pf__row pf__justify_content_between">
          <div>
          <Link to="/" className="pf__link pf__logo">s</Link>
          </div>
          <div className="pf__hamburger_btn pf__outer_shadow pf__hover-in-shadow" >
          <span></span>
          </div>
        </div>
      </div>
    </header>
    <nav className="pf__nav_menu">
      <div className="pf__close_nav_menu">
        &times;
      </div>
      <div className="pf__nav_menu_inner">
        <ul>
          <li><Link to="/" className="pf__link pf__inner_shadow pf_active">home</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow hover_in_shadow">about</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow hover_in_shadow">services</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow hover_in_shadow">portfolio</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow hover_in_shadow">testimonial</Link></li>
          <li><Link to="/" className="pf__link pf__outer_shadow hover_in_shadow">contact</Link></li>
        </ul>
      </div>
    </nav>

    </div>
  )
}

export default Home
