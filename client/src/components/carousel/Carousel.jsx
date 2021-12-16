// import React, {useEffect} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './Carousel.css'
import {img1,img2,img3} from '../../images'
// import img2 from '../../images/project-2.png'
// import img3 from '../../images/project-3.png'
let testimage = [img1,img2,img3]

const Carousel = ({images, id}) => {
  const isActive = index =>{
    if(index ===0)return"active"
  }


  return (
    <>
    <div id={`image${id}`} className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      {
        testimage.map((img,index)=>(
          <li key={index} data-target={`#image${id}`} data-slide-to={index} className={isActive(index)}></li>

        ))
      }

    </ol>
    <div className="carousel-inner">
    {
      testimage.map((img, index) =>(
        <div key={index} className={`carousel-item ${isActive(index)}`}>
          {/*<img src={img.url} className="d-block w-100" alt={img.url}/>*/}
          <img src={img} className="d-block w-100" alt={img}/>
        </div>

      ))
    }

    </div>
    <a className="carousel-control-prev" href={`#image${id}`} role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href={`#image${id}`} role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>


    </>
  )
}

export default Carousel
