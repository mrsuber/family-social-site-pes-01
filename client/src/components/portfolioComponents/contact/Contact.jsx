import React from 'react'
import './Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faEnvelope,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <section className="pf__contact_section pf__section" id="contact">
      <div className="pf__container">
        <div className="pf__row" >

              <div className="pf__section_title">
                <h2 data-heading="contact">Get In Touch</h2>

            </div>
        </div>
        <div className="pf__row">
          {/*contact item starts */}
          <div className="pf__contact_item">
            <div className="pf__contact_item_inner pf__outer_shadow">
              <span><FontAwesomeIcon icon={faPhone} /></span>
              <span>Phone</span>
              <p>+237 653 255 547</p>
            </div>
          </div>
          {/*contact item ends*/}

          {/*contact item starts */}
          <div className="pf__contact_item">
            <div className="pf__contact_item_inner pf__outer_shadow">
              <span><FontAwesomeIcon icon={faEnvelope} /></span>
              <span>Email</span>
              <p>msiysinyuy@gmail.com</p>
            </div>
          </div>
          {/*contact item ends*/}

          {/*contact item starts */}
          <div className="pf__contact_item">
            <div className="pf__contact_item_inner pf__outer_shadow">
              <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
              <span>Address</span>
              <p>Cameroon | Buea | Malingo</p>
            </div>
          </div>
          {/*contact item ends*/}
        </div>
        <div className="pf__row">
          <div className="pf__contact_form">
            <form action="https://formsubmit.co/msiysinyuy@gmail.com" method="POST">
            <input type="hidden" name="_next" value="https://msb-geneasocial.herokuapp.com/porfolio/home"/>
            <input type="hidden" name="_subject" value="New email from porfolio site!"/>
            
                <div className="pf__row">
                  <div className="pf__w_50">
                    <div className="pf__input_group pf__outer_shadow pf__hover_in_shadow">
                      <input type="text" name="name" placeholder="Name" className="pf__input_control" required/>
                    </div>

                    <div className="pf__input_group pf__outer_shadow pf__hover_in_shadow">
                      <input type="email" name="email" placeholder="Email" className="pf__input_control" required/>
                    </div>

                    <div className="pf__input_group pf__outer_shadow pf__hover_in_shadow">
                      <input type="text"placeholder="Subject" className="pf__input_control"/>
                    </div>

                  </div>
                  <div className="pf__w_50">
                      <div className="pf__input_group pf__outer_shadow pf__hover_in_shadow">
                          <textarea className="pf__input_control" placeholder="Message"></textarea>
                      </div>
                  </div>
                </div>

                <div className="pf__row">
                  <div className="pf__submit_btn">
                    <button type="submit" className="pf__btn1 pf__outer_shadow pf__hover_in_shadow">Send Message</button>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
