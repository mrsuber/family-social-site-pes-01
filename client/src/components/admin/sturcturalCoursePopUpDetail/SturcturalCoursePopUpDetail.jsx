import React from 'react'
import {AdminSources} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faEnvelope,faGlobe,faMapMarker,faFilm,faCookie,faPaintBrush,faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

import {LinkedIn} from '@material-ui/icons'

import './sturcturalCoursePopUpDetail.css'

const SturcturalCoursePopUpDetail = ({setOnView,onView=false, data,position}) => {
console.log("data",data)

  return (
    <>{
      onView===false
      ? <></>
      : <>
      <div className="admin__profileOnveiw-container" style={{background:'#2d88ee08'}}>



      <div className="admin__profileOnveiw-content2">

      <div className="admin__main-resume-container">
      <div className="admin__resume__left-side">
        <div className="admin__resume__profileText">
          <div className="admin__resume__img-box">
            <img src={data.logo}  alt="Mohamad"/>
          </div>
          <h2>{data.name? data.name:<span className="admin__worning-update">update Name</span>}<br/><span>{data.courseNumber? data.courseNumber :<span className="admin__worning-update">update course Number</span>}{' - '}{data.courseStatus? data.courseStatus :<span className="admin__worning-update">update Status</span>}</span></h2>
        </div>
        <div className="admin__resume__contactInfo">
          <h3 className="admin__resume__title">Side Menu</h3>
          <ul>
          {
            data.menu && data.menu.length!==0
            ?data.menu.map((item)=>(
              <li className="admin__popup-sidemenu">

                <a href={`#${item.ancorName}`} style={{textDecoration:"none"}}><span className="admin__resume__text">{item.name}</span></a>
              </li>
            ))
            :<li>

              <span className="admin__resume__text">{<span className="admin__worning-update">update Menu</span>}</span>
            </li>
          }


          </ul>
        </div>



      </div>

      <div className="admin__resume__right-side">
        <div className="admin__resume__about">

          {
            data.menu && data.menu.length!==0
            ?data.menu.map((item)=>(
              <>
              <a id={item.ancorName} style={{textDecoration:"none"}}>
              <h2 className="admin__resume__right-title">{item.name}</h2>
              </a>
              <p className="admin__resume__right-par">
                {item.detail}
              </p>
              </>
            ))
            :<span className="admin__worning-update">update Details</span>
          }


        </div>




      
      </div>


      </div>
      <AdminSources source={data.source} name="location " id="src1"/>

      <button className="admin__profileOnView-sturctur-btn" onClick={()=>setOnView(false)}>
        <h4>Back</h4>
      </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default SturcturalCoursePopUpDetail
