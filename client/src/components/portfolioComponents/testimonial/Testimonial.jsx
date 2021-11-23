import React,{useEffect} from 'react'
import './Testimonial.css'
import {TestimonialItem} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

import img1 from '../../../images/porfolioImages/testimonial/1.png'

const Testimonial = () => {
useEffect(()=>{
  const sliderContainer = document.querySelector(".pf__testi_slider_container"),
    slides = sliderContainer.querySelectorAll(".pf__testi_item"),
    slideWith = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".pf__prev"),
    nextBtn = document.querySelector(".pf__next"),
    activeSlide = sliderContainer.querySelector(".pf__testi_item.pf__active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);



      //set width of all slides
      slides.forEach((slide)=>{
        slide.style.width = slideWith + "px"
      })
      //set width of sliderContainer
      sliderContainer.style.width = slideWith * slides.length + "px";


      nextBtn.addEventListener("click",() =>{
        if(slideIndex=== slides.length-1){
          slideIndex = 0;
        }else{
          slideIndex++;
        }
        slider()
      })
      prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
          slideIndex = slides.length-1;
        }else{
          slideIndex--;
        }
        slider()
      })

      function slider(){
        //deactivating exiting active slide
        sliderContainer.querySelector(".pf__testi_item.pf__active").classList.remove("pf__active")
        //activate new slide
        slides[slideIndex].classList.add("pf__active");
        sliderContainer.style.marginLeft = - (slideWith * slideIndex) + "px"
      }
},[])
  return (
    <>

  <section className="pf__testimonial_section pf__section" id="testimonial">
    <div className="pf__container">
      <div className="pf__row">
        <div className="pf__section_title">
            <h2 data-heading="testimonial">Client Speak </h2>
        </div>
      </div>
      <div className="pf__row">
        <div className="pf__testi_box">
            <div className="pf__testi_slider pf__outer_shadow">
                <div className="pf__testi_slider_container ">
                  {/*testi item start*/}
                  <TestimonialItem img={img1} name="Mohamad Siysinyuy" description=" I will Stop at nothing to always be beter than my best."/>
                  {/*testi item end*/}

                  {/*testi item start*/}
                  <TestimonialItem img={img1} name="Mohamad Siysinyuy" state="pf__active" description=" I will Stop at nothing to always be beter than my best."/>
                  {/*testi item end*/}

                  {/*testi item start*/}
                  <TestimonialItem img={img1} name="Mohamad Siysinyuy"/>
                  {/*testi item end*/}
                </div>
            </div>
            <div className="pf__testi_slider_nav">
              <span className="pf__prev pf__outer_shadow pf__hover_in_shadow" ><FontAwesomeIcon icon={faAngleLeft} /></span>
              <span className="pf__next pf__outer_shadow pf__hover_in_shadow" ><FontAwesomeIcon icon={faAngleRight} /></span>
            </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Testimonial
