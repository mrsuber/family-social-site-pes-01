import React from 'react'
import './Carousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faQuoteLeft, faQuoteRight,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import img from '../../images/blog-1.jpg'
import img2 from '../../images/project-2.png'
import img3 from '../../images/project-3.png'

const Carousel = () => {
  return (
    <div className="social2__caro_container">


    <div className="social2__caro_row">
      <div className="social2__caro_testi_box">
        <div className="social2__caro_testi_slider">
          <div className="social2__caro_testi_slider_container">
            {/*testi item starts*/}
              <div className="social__caro_testi_item">
              <FontAwesomeIcon icon={faQuoteLeft} className="social2__caro_left"/>
              <FontAwesomeIcon icon={faQuoteRight} className="social2__caro_right"/>
              <p>same technology used in my porfolio web</p>
              <img src={img} alt="post_image"/>
              <span>  mohamad siysinyuy</span>
              </div>
            {/*testi item ends*/}
          </div>
        </div>
          <div className="social2__caro__testi_slider_nav">
          <span className="social2__caro_prev"><FontAwesomeIcon icon={faAngleLeft} /></span>
          <span className="social2__caro_next"><FontAwesomeIcon icon={faAngleRight} /></span>
          </div>
      </div>
    </div>

    </div>
  )
}

export default Carousel
