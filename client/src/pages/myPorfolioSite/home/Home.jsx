import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import profilePic from '../../../images/porfolioImages/profile-pic.png'
import {Facebook,Instagram, GitHub,LinkedIn} from "@material-ui/icons"

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

    {/*about section end*/}
    <section className="pf__about_section pf__section">
      <div className="pf__container">
        <div className="pf__row">
          <div className="pf__section_title">
            <h2 data-heading="main info">About me</h2>
          </div>
        </div>
        <div className="pf__row">
          <div className="pf__about_img">
            <div className="pf__img_box pf__inner_shadow">
              <img src={profilePic} alt="Profile Pic" className="pf__outer_shadow"/>
            </div>
            {/*social links start*/}
            <div className="pf__social_links">
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Facebook/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><Instagram/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><GitHub/></a>
                <a href="#" className="pf__link pf__outer_shadow pf__hover_in_shadow"><LinkedIn/></a>

            </div>
            {/*social links end*/}
          </div>
          <div className="pf__about_info">
            <p><span>Hi! My name is Mohamad Siysinyuy. I am a Web Developer.</span>I was introduce to software development in my very first year in the university studying computer engineering which gave me a direct line to Web Development.
</p>
            <p>Due to personal research and following full-stack online curriculum, i learn about HTML and its evolution to HTML5, used tools like WAVE and W3C for accessibility, CSS3 ,Bootstrap, SASS, SCSS,for styling design and animations, then JavaScript, JQuery for logic and fetching data from REST APIs.</p>
            <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being familiar npm for installing dependencies and tools such as WebPack which came loaded with tools necessary for minifying my code for accessibility, Babel for translating ES6 JavaScript code to ES5 JavaScript code for browser comparability.</p>

            <p>To complete my full stack journey as a full stack developer, i was introduce to back-end technologies such as Nodjs, Python frame work like Flask, Django and NoSQL database like MongoDB, SQL database like MYSQL, and Docker technologies.
</p>
            <p>To showcase my projects to the world, I had to host them with FireBase, Heroku, Github.</p>

            <a href="cv.pdf" className="pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1" >Download Cv</a>
            <a href="#" className="pf__outer_shadow pf__hover_in_shadow pf__link pf__btn1">Hire Me</a>
          </div>
        </div>
        {/*about taps start*/}
        <div className="pf__row">
          <div className="pf__about_tabs">
            <span className="pf__tab_item pf__outer_shadow pf__active" data-target=".skills">skills</span>
            <span className="pf__tab_item" data-target=".experience">experience</span>
            <span className="pf__tab_item" data-target=".education">education</span>
          </div>
        </div>

        {/*about taps end*/}

        {/*skills end*/}
        <div className="pf__row">
            <div className="pf__skills pf__tab_content">
            <div className="pf__row">

              {/*skill start*/}
                <div className="pf__skill_item" >
                    <p>Html</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(50% - 14px)"}}>
                        <span>50%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>JavaScript</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(60% - 14px)"}}>
                        <span>60%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}


              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>bootstrap</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(70% - 14px)"}}>
                        <span>70%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>jquery</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(80% - 14px)"}}>
                        <span>80%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>angular</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(90% - 14px)"}}>
                        <span>90%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}

              {/*skill start*/}
                <div className="pf__skill_item">
                    <p>react</p>
                    <div className="pf__progress pf__inner_shadow">
                      <div class="pf__progress_bar" style={{width:"calc(100% - 14px)"}}>
                        <span>100%</span>
                      </div>
                    </div>
                </div>
              {/*skill start*/}



            </div>
            </div>
        </div>
        {/*skills end*/}
      </div>

    </section>
    {/*about section end*/}

    </div>
  )
}

export default Home
