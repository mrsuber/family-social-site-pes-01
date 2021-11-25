import React from 'react'
import './Popup.css'
import dsh1 from "../../../images/porfolioImages/portfolio/large/project-23/1.png"

import {Remove,PlayArrow,Add} from "@material-ui/icons"

const Popup = ({handlepopupDetails,handlePopupClose , handlePrevSlide,handleNextSlide,remove }) => {
  return (
    <div className="pf__pp pf__portfolio_popup">
      <div className="pf__pp_details">
        <div className="pf__pp_details_inner">
          <div className="pf__pp_title">
            <h2>personal porfolio</h2>
            <p>Category - <span className="pf__pp_project_category">Web Application</span></p>
          </div>
          <div className="pf__pp_project_details" >
          <div className="pf__row">
            <div className="pf__description">
              <h3>Project Brief:</h3>
              <p>After a couple of projects with these languages for Front-End and UI Designs, i was introduce to frame works like React and Angular for building single web applications and proper use of props and components certainly made life easier. My new life into frame works lead me to being</p>

            </div>
            <div className="pf__info">
              <h3>Project Info</h3>
              <ul>
                <li>Date - <span>2020</span> </li>
                <li>Client - <span>xyz</span> </li>
                <li>Tools - <span>html, css, javascript</span> </li>
                <li>Web - <span><a href="#">www.domain.com</a></span> </li>
                <li>Date - <span>2020</span> </li>

              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="pf__separator"></div>

      <div className="pf__pp_main">
        <div className="pf__pp_main_inner">
        <div className="pf__pp_project_details_btn pf__outer_shadow pf__hover_in_shadow" onClick={handlepopupDetails}>Project Details {remove ? <Remove/> : <Add/>} </div>
        <div className="pf__pp_close pf__outer_shadow pf__hover_in_shadow" onClick={handlePopupClose}>&times;</div>
          <img src={dsh1} alt="img" className="pf__pp_img pf__outer_shadow" />
          <div className="pf__pp_counter">1 of 6</div>
        </div>
        <div className="pf__pp_loader">
          <div></div>
        </div>
          {/*porfolio navigation start*/}
          <div className="pf__next_and_prev_btn_container">
            <div className="pf__pp_prev" onClick={handlePrevSlide}><PlayArrow/></div>
            <div className="pf__pp_next" onClick={handleNextSlide}><PlayArrow/></div>
              </div>
            {/*porfolio navigation start*/}
      </div>
    </div>
  )
}

export default Popup
