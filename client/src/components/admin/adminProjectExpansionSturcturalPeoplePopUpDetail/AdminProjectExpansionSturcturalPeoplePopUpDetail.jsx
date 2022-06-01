import React,{useState} from 'react'
import {AdminSources} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faEnvelope,faGlobe,faMapMarker,faFilm,faCookie,faPaintBrush,faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

import {LinkedIn,Twitter} from '@material-ui/icons'

import './AdminProjectExpansionSturcturalPeoplePopUpDetail.css'

const AdminProjectExpansionSturcturalPeoplePopUpDetail = ({data}) => {

  const [showProfile, setShowProfile] = useState(false)
  return (
    <>
    <span onClick={()=>setShowProfile(true)} className="courseImageReadMorePopUp">{data.mainName}</span>

      {showProfile
        ?<div className="admin__profileOnveiw-container" style={{background:'#2d88ee08'}}>



      <div className="admin__profileOnveiw-content2">

      <div className="admin__main-resume-container">
      <div className="admin__resume__left-side">
        <div className="admin__resume__profileText">
          <div className="admin__resume__img-box">
            <img src={data.photo}  alt="Mohamad"/>
          </div>
          <h2>{data.name? data.name:<span className="admin__worning-update">update Name</span>}<br/><span>{data.title? data.title:<span className="admin__worning-update">update Position</span>}</span></h2>
        </div>
        <div className="admin__resume__contactInfo">
          <h3 className="admin__resume__title">Contact Info</h3>
          <ul>
            <li>
              <span className="admin__resume__icon"><FontAwesomeIcon icon={faPhone}/></span>
              <span className="admin__resume__text">{data.phoneNumber? data.phoneNumber:<span className="admin__worning-update">update PhoneNumber</span>}</span>
            </li>

            <li>
              <span className="admin__resume__icon"><FontAwesomeIcon icon={faEnvelope}/></span>
              <span className="admin__resume__text">{data.email? data.email:<span className="admin__worning-update">update email</span>}</span>
            </li>

            <li>
              <span className="admin__resume__icon"><FontAwesomeIcon icon={faGlobe}/></span>
              <span className="admin__resume__text">{data.website? data.website:<span className="admin__worning-update">update Website</span>}</span>
            </li>

            <li>
              <span className="admin__resume__icon"><LinkedIn/></span>
              <span className="admin__resume__text">{data.linkedIn? data.linkedIn:<span className="admin__worning-update">update LinkedIn</span>}</span>
            </li>

            <li>
              <span className="admin__resume__icon"><Twitter/></span>
              <span className="admin__resume__text">{data.twitter? data.twitter:<span className="admin__worning-update">update Twitter</span>}</span>
            </li>

            <li>
              <span className="admin__resume__icon"><FontAwesomeIcon icon={faMapMarker}/></span>
              <span className="admin__resume__text">{data.address? data.address:<span className="admin__worning-update">Update Address</span>}</span>
            </li>
          </ul>
        </div>


        <div className="admin__resume__contactInfo admin__resume__education">
          <h3 className="admin__resume__title">Education</h3>

          <ul>
            {data.Education && data.Education.length!==0
              ?data.Education.map((info)=>(
                <li>
                <h5>{info.year}</h5>
                <h4>{info.certificateName}<br/><span>{info.certificatePoints}</span></h4>
                <h4>{info.institutionName}</h4>
                </li>
              ))
              :<li>
              <h5><span className="admin__worning-update">update Year</span></h5>
              <h4><span className="admin__worning-update">update Name of Certicate</span><br/><span><span className="admin__worning-update">update Grades in that certificate</span></span></h4>
              <h4><span className="admin__worning-update">update Name of institution</span></h4>
              </li>

            }

          </ul>
        </div>

        <div className="admin__resume__contactInfo admin__resume__language">
          <h3 className="admin__resume__title">Languages</h3>
          <ul>

          {data.languages && data.languages.length!==0
            ?data.languages.map((info)=>(
              <li>
                  <span className="admin__resume__text">{info.languageName}</span>
                  <span className="admin__resume__percent">
                    <div className="admin__resume__percent-score" style={{width:`${info.languagesPercent? info.languagesPercent:'0%'}`}}></div>
                  </span>
              </li>
            ))
            :<li>
                <span className="admin__resume__text"><span className="admin__worning-update">update Language Name</span></span>
                <span className="admin__resume__percent">
                  <div style={{width:`0%`}}></div>
                </span>
            </li>}



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

      <button className="admin__profileOnView-sturctur-btn" onClick={()=>setShowProfile(false)}>
        <h4>Back</h4>
      </button>
      </div>


      </div>
      :<></>
    }
    </>

  )
}

export default AdminProjectExpansionSturcturalPeoplePopUpDetail
