import React from 'react'
import './Home.css'

const Home = ({profilePic,color1,color2,color3,color4,color5}) => {
  return (
    <section className="pf__home_section pf__section pf__active" id="home">
    {/*effect wrap starts*/}
      <div className="pf__effect_wrap">
        <div className="pf__effect pf__effect1"></div>
        <div className=" pf__effect pf__effect2">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div
        className={`pf__effect pf__effect3 ${color1===true? "pf__color11":""} ${color2===true? "pf__color21":""} ${color3===true? "pf__color31":""} ${color4===true? "pf__color41":""} ${color5===true? "pf__color51":""}`}
        ></div>

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
              <a href="#about" className={`pf__link_item pf__btn1 pf__outer_shadow pf__hover_in_shadow pf__link ${color1===true? "pf__color1":""} ${color2===true? "pf__color2":""} ${color3===true? "pf__color3":""} ${color4===true? "pf__color4":""} ${color5===true? "pf__color5":""}`}
              >More About Me</a>
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
