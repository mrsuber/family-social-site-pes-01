import React,{useEffect} from 'react'
import './Carousel.css'
import img from '../../images/blog-1.jpg'
import img2 from '../../images/project-2.png'
import img3 from '../../images/project-3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = () => {
  let slideIndex = 0;
  let slider = document.querySelector(".social2__caro_slider")
  let slides = document.querySelector(".social2__caro_slides")
  let slide = document.querySelectorAll(".social2__caro_slide")
  let dots = document.querySelectorAll(".social2__caro_dots span")

  const plusslide=(position)=>{
    console.log("i am clicking and this is the position",position)
    slideIndex+=position;
    if(slideIndex > slide.length){
      slideIndex=1;
    }

    else if(slideIndex < 1){
      slideIndex=slide.length;
    }
    //default active class is removed form all the dots
    for(let i =0; i<dots.length;i++){
      let element = dots[i]
      element.classList.remove("social2__dot_active")
    }

    slides.style.left =`-${slideIndex - 1}00%;`
    dots[slideIndex-1].classList.add("social2__dot_active")
  }

  const  currentslide=(index)=>{

    if(index > slide.length){
      index=1;
    }

    else if(index < 1){
      index=slide.length;
    }
    //default active class is removed form all the dots
    for(let i =0; i<dots.length;i++){
      let element = dots[i]
      element.classList.remove("social2__dot_active")
    }

    slides.style.left =`-${index - 1}00%;`
    dots[index-1].classList.add("social2__dot_active")

    slideIndex=index;
  }
  const  showslide=()=>{
    slideIndex++;

    if(slideIndex > slide.length){
      slideIndex=1;
    }

    else if(slideIndex < 1){
      slideIndex=slide.length;
    }
    //default active class is removed form all the dots
    for(let i =0; i<dots.length;i++){
      let element = dots[i]
      element.classList.remove("social2__dot_active")
    }

    slides.style.left =`-${slideIndex - 1}00%;`
    dots[slideIndex-1].classList.add("social2__dot_active")
  }

  let interval = setInterval(()=>{
    showslide()
  },3000) //change every image after 3 seconds

  slider.addEventListener("mouseover",()=>{
    clearInterval(interval)// on hover stop change every image after 3 seconds
  })

  slider.addEventListener("mouseout",()=>{
    interval = setInterval(()=>{
     showslide()
   },3000) // on mouseout from slide then again start changing every image after 3 seconds
  })
function plusslideleft(){
  plusslide(-1)
}

function plusslideright(){
  plusslide(1)
}
useEffect(()=>{
  showslide()
},[])



  return (
    <div className="social2__caro_slider">
      <div className="social2__caro_slides">
          <div className="social2__caro_slide" style={{backgroundImage:`url(${img})`}}>
            <div className="social2__caro_slide_data">
            <h1>This is slide # 1</h1>
            <p>This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            </p>
            <button>SUBSCRIBE</button>
            </div>
          </div>

          <div className="social2__caro_slide" style={{backgroundImage:`url(${img2})`}}>
            <div className="social2__caro_slide_data">
            <h1>This is slide # 2</h1>
            <p>This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            </p>
            <button>COMMENT</button>
            </div>
          </div>

          <div className="social2__caro_slide" style={{backgroundImage:`url(${img3})`}}>
            <div className="social2__caro_slide_data">
            <h1>This is slide # 3</h1>
            <p>This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            This is the paragrah to the slide number 1.This is the paragrah to the slide number 1
            </p>
            <button>SHARE</button>
            </div>
          </div>
      </div>
        <button className="social2__caro_arrows social2__caro_arrows_prev" onClick={plusslideleft}><span><FontAwesomeIcon icon={faAngleLeft} /></span></button>
        <button className="social2__caro_arrows social2__caro_arrows_next" onClick={plusslideright}><span><FontAwesomeIcon icon={faAngleRight} /></span></button>

        <div className="social2__caro_dots">
          <span onClick={currentslide(1)}></span>
          <span onClick={currentslide(2)}></span>
          <span onClick={currentslide(3)}></span>
        </div>

    </div>

  )
}

export default Carousel
