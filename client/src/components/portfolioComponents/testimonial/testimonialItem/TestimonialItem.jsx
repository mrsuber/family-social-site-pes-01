import React from 'react'
import './TestimonialItem.css'
// import {FormatQuote} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';

const TestimonialItem = ({img,name,state,description}) => {


  return (
    <div className={`pf__testi_item ${state? state:""}`}>
    <span><FontAwesomeIcon icon={faQuoteLeft} className="pf__left"/></span>
      <span><FontAwesomeIcon icon={faQuoteRight} className="pf__right"/></span>

    <p>{description}</p>
    <img src={img} alt="testimonial"/>
    <span>{name}</span>
    </div>
  )
}

export default TestimonialItem
