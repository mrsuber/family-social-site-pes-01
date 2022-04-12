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

                <span className="admin__resume__text">{item.name}</span>
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
        <h2 className="admin__resume__right-title">Profile</h2>
          {
            data.knowmore? <p className="admin__resume__right-par">
            {data.BiographyP1? data.BiographyP1 : <span className="admin__worning-update">update Paragraph 1</span>}<br/><br/>
            <br/>
            <span><a href={data.knowmore} target="_blank" rel="noreferrer">know more...</a></span>
            </p>:<p className="admin__resume__right-par">
             {data.BiographyP1? data.BiographyP1 : <span className="admin__worning-update">update Paragraph 1</span>}<br/><br/>
             {data.BiographyP2? data.BiographyP2 : <span className="admin__worning-update">update Paragraph 2</span>}<br/><br/>
             {data.BiographyP3? data.BiographyP3 : <span className="admin__worning-update">update Paragraph 3</span>}<br/><br/>
             {data.BiographyP4? data.BiographyP4 : <span className="admin__worning-update">update Paragraph 4</span>}<br/><br/>
             {data.BiographyP5? data.BiographyP5 : <span className="admin__worning-update">update Paragraph 5</span>}
             </p>

          }

        </div>

        <div className="admin__resume__about">
        <h2 className="admin__resume__right-title">Experience</h2>
        {data.Experience && data.Experience.length!==0 ? data.Experience.map((ex)=>(
          <div className="admin__resume__right-box">

            <div className="admin__resume__year-company">
              <h5>{ex.yearsOfExperience}</h5>
              <h5>{ex.placeOfExperience}</h5>
              <h5>{ex.locationOfExperience}</h5>

            </div>
            <div className="admin__resume__text">
              <h4>{ex.areaOfExpertise}</h4>
              <p>{ex.descOfWorkDoneInAreaOfExpertise}</p>
            </div>
          </div>
        )) : <div className="admin__resume__right-box">

          <div className="admin__resume__year-company">
            <h5><span className="admin__worning-update">update Year of Experience</span></h5>
            <h5><span className="admin__worning-update">update place of Experience</span></h5>
            <h5><span className="admin__worning-update">Location of Experience</span></h5>

          </div>
          <div className="admin__resume__text">
            <h4><span className="admin__worning-update">update area of Expertise</span></h4>
            <p><span className="admin__worning-update">update desc of work done in area of expertise</span></p>
          </div>
        </div>
      }

        </div>

        <div className="admin__resume__about admin__resume__skills">
        <h2 className="admin__resume__right-title">Professional Skills</h2>
        {data.professionalSkills && data.professionalSkills.length!==0? data.professionalSkills.map((skills)=>(
          <div className="admin__resume__right-box">
            <h4>{skills.nameOfSkill}</h4>
            <div className="admin__resume__righ-percent"><div style={{width:`${skills.persentageOfSkills}`}}></div></div>
          </div>
        ))
        :<div className="admin__resume__right-box">
          <h4><span className="admin__worning-update">update Name of Skill</span></h4>
          <div className="admin__resume__righ-percent"><div style={{width:`0%`}} ></div></div>
        </div>
      }

        </div>
        <div className="admin__resume__about admin__resume__interest">
          <h2 className="admin__resume__right-title">Interest</h2>
          <ul>
            {data.Interest && data.Interest.length!==0? data.Interest.map((int)=>(
              <li><FontAwesomeIcon icon={int.iconOfInterest}/> {int.nameOfInterest}</li>
            ))
            :<>
            <li><FontAwesomeIcon icon={faCookie}/><span className="admin__worning-update">update name and Icon</span></li>
            <li><FontAwesomeIcon icon={faCookie}/><span className="admin__worning-update">update name and Icon</span></li>
            <li><FontAwesomeIcon icon={faCookie}/><span className="admin__worning-update">update name and Icon</span></li>
            <li><FontAwesomeIcon icon={faCookie}/><span className="admin__worning-update">update name and Icon</span></li>
            </>
          }

          </ul>
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
