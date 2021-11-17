import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import profilePic from '../../../images/porfolioImages/profile-pic.png'

const Home = () => {
  return (
    <div className="pf__body">
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

    {/*home section starts*/}
    <section className="pf__home_section pf__section">
    {/*effect wrap starts*/}
      <div className="pf__effect_wrap">
        <div className="pf__effect pf__effect1"></div>
        <div className=" pf__effect pf__effect2">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div className="pf__effect pf__effect3"></div>

        <div className="pf__effect pf__effect4"></div>
        <div className="pf__effect pf__effect5">
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

    {/*effect wrap end*/}
      <div className="pf__container">
        <div className="pf__row pf__full_screen  pf__align_items_center">
            <div className="pf__home_text">
              <p>Hello</p>
              <h2>I'm Mohamad Siysinyuy</h2>
              <h1>Web Designer & Developer</h1>
              <a href="#" className="pf__btn1 pf__outer_shadow pf__hover_in_shadow pf__link">More About Me</a>
            </div>
            <div className="pf__home_img">
              <div className="pf__img_box pf__inner_shadow">
                <img src={profilePic} alt="Profile-Pic" className="pf__outer_shadow"/>
              </div>
            </div>
        </div>
      </div>
    </section>
    {/*home section end*/}
    </div>
  )
}

export default Home
