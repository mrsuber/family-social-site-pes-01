import React from 'react'
import './Home.css'

const Home = ({profilePic}) => {
  return (
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
  )
}

export default Home
