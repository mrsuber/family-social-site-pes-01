import React from 'react'
// import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
        <>
        <nav className="pf__nav_menu">
          <div className="pf__close_nav_menu pf__outer_shadow pf__hover_in_shadow">
            &times;
          </div>
          <div className="pf__nav_menu_inner">
            <ul>
              <li><a href="#home" className="pf__link_item pf__link pf__inner_shadow pf__active">home</a></li>
              <li><a href="#about" className="pf__link_item pf__link pf__outer_shadow pf__hover_in_shadow">about</a></li>
              <li><a href="#services" className="pf__link_item pf__link pf__outer_shadow pf__hover_in_shadow">services</a></li>
              <li><a href="#portfolio" className="pf__link_item pf__link pf__outer_shadow pf__hover_in_shadow">portfolio</a></li>
              <li><a href="#testimonial" className="pf__link_item pf__link pf__outer_shadow pf__hover_in_shadow">testimonial</a></li>
              <li><a href="#contact" className="pf__link_item pf__link pf__outer_shadow pf__hover_in_shadow">contact</a></li>
            </ul>
          </div>
          <p className="pf__copyright_text">&copy; 2021 MSB-Porfolio Web</p>

        </nav>
          <div className="pf__fade_out_effect"></div>
          </>
  )
}

export default Navbar
