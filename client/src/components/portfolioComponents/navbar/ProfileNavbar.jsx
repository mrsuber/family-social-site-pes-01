import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (

        <nav className="pf__nav_menu">
          <div className="pf__close_nav_menu pf__outer_shadow pf__hover_in_shadow">
            &times;
          </div>
          <div className="pf__nav_menu_inner">
            <ul>
              <li><Link to="/" className="pf__link pf__inner_shadow pf_active">home</Link></li>
              <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">about</Link></li>
              <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">services</Link></li>
              <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">portfolio</Link></li>
              <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">testimonial</Link></li>
              <li><Link to="/" className="pf__link pf__outer_shadow pf__hover_in_shadow">contact</Link></li>
            </ul>
          </div>
          <p className="pf__copyright_text">&copy; 2021 MSB-Porfolio Web</p>
        </nav>
  )
}

export default Navbar
