import React,{useState} from 'react'
import {AdminSources,AdminCourseImagePopUp,AdminCourseUrlPopUp} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faEnvelope,faGlobe,faMapMarker,faFilm,faCookie,faPaintBrush,faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

import {LinkedIn} from '@material-ui/icons'

import './adminSturcturalRelCoursePopUpDetail.css'

const AdminSturcturalRelCoursePopUpDetail = ({setOnView,onView=false, data,position}) => {


  return (
    <>{
      onView===false
      ? <></>
      : <>
      <div className="admin__profileOnveiw-container" style={{background:'#2d88ee08'}}>



      <div className="admin__profileOnveiw-content33">

      <div className="admin__main-resume-container">
      <div className="admin__resume__left-side">
        <div className="admin__resume__profileText">
          <div className="admin__resume__img-box">
            <img src={data.logo}  alt="Mohamad"/>
          </div>
          <h2>{data.name? data.name:<span className="admin__worning-update">update Name</span>}<br/><span>{data.courseNumber? data.courseNumber :<span className="admin__worning-update">update course Number</span>}{' - '}{data.courseStatus? data.courseStatus :<span className="admin__worning-update">update Status</span>}</span></h2>
        </div>
        <div className="admin__resume__contactInfo">
          <h3 className="admin__resume__title">Side Rel Menu</h3>
          <ul>
          {
            data.menu && data.menu.length!==0
            ?data.menu.map((item)=>(
              <li className="admin__popup-sidemenu">

                <a href={`#${item.ancorName}`} style={{textDecoration:"none"}}><span className="admin__resume__text">{item.name}</span></a>
              </li>
            ))
            :<>

            </>
          }

          {
            data.menu2 && data.menu2.length!==0
            ?data.menu2.map((item)=>(
              <li className="admin__popup-sidemenu">

                <a href={`#${item.ancorName}`} style={{textDecoration:"none"}}><span className="admin__resume__text">{item.name}</span></a>
              </li>
            ))
            :<>

            </>
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
              {item.detail1 &&<p className="admin__resume__right-par">
                {item.detail1}
              </p>}

              {item.detail2 &&<p className="admin__resume__right-par">
                {item.detail2}
              </p>}

              {item.detail3 &&<p className="admin__resume__right-par">
                {item.detail3}
              </p>}

              {item.detail4 &&<p className="admin__resume__right-par">
                {item.detail4}
              </p>}

              {item.detail5 &&<p className="admin__resume__right-par">
                {item.detail5}
              </p>}

              {item.detail6 &&<p className="admin__resume__right-par">
                {item.detail6}
              </p>}

              {item.popup1
                ?<>

                <AdminCourseImagePopUp img={item.popup1} name={item.popup1Name?item.popup1Name:'Read More...'}  />
                </>
                :<></>
              }
              {item.popup2
                ?<>
                <hr className="admin__hr_break"/>
                <AdminCourseImagePopUp img={item.popup2} name={item.popup2Name?item.popup2Name:'Read More...'} />
                </>
                :<></>
              }

              {item.popup3
                ?<>
                <hr className="admin__hr_break"/>
                <AdminCourseImagePopUp img={item.popup3} name={item.popup3Name?item.popup3Name:'Read More...'} />
                </>
                :<></>
              }
              </>
            ))
            :<span className="admin__worning-update">{/*update Details*/}</span>
          }

          {
            data.menu2 && data.menu2.length!==0
            ?data.menu2.map((item)=>(
              <>
              <a id={item.ancorName} style={{textDecoration:"none"}}>
              <h2 className="admin__resume__right-title">{item.name}</h2>
              </a>
              <p className="admin__resume__right-par">
                {item.detail}
                {item.verses && item.verses.length>0
                  ?item.verses.map((verse)=>(
                    <div>
                        <ul>
                          <li>{verse.hebrew && verse.hebrew.length>0? verse.hebrew.map((word)=>(
                            <div style={{margin:"0 23px",fontSize:"12px"}}>
                            {word}

                            </div>)):<>No word</>}</li>
                          <li>{verse.transliteration && verse.transliteration.length>0? verse.transliteration.map((word)=>(<span style={{margin:"0 23px",fontSize:"12px"}}>{word}</span>)):<>No word</>}</li>
                          <li>{verse.english && verse.english.length>0? verse.english.map((word)=>(<span style={{margin:"0 23px",fontSize:"12px"}}>{word}</span>)):<>No word</>}</li>
                          <li>fullen</li>
                        </ul>
                    </div>
                  ))

                  :<>Donothing</>}
              </p>


              {item.popup1
                ?<>

                <AdminCourseImagePopUp img={item.popup1} name={item.popup1Name?item.popup1Name:'Read More...'}  />
                </>
                :<></>
              }
              {item.popup2
                ?<>
                <hr className="admin__hr_break"/>
                <AdminCourseImagePopUp img={item.popup2} name={item.popup2Name?item.popup2Name:'Read More...'} />
                </>
                :<></>
              }

              {item.popup3
                ?<>
                <hr className="admin__hr_break"/>
                <AdminCourseImagePopUp img={item.popup3} name={item.popup3Name?item.popup3Name:'Read More...'} />
                </>
                :<></>
              }
              </>
            ))
            :<span className="admin__worning-update">{/*update Details*/}</span>
          }
          {!data.KnowledgeCheck || data.KnowledgeCheck.length===0
            ?<></>

            :<>
            <h2 className="admin__resume__right-title">Knowledge Check</h2>
            <p className="admin__resume__right-par" style={{color:"#00ffe5"}}>This section contains questions for you to check your understanding of this lesson on your own. If you’re having trouble answering a question, Go back and study again.</p>
            </>

          }
          {

            data.KnowledgeCheck && data.KnowledgeCheck.length!==0
            ?data.KnowledgeCheck.map((item,index)=>(
              <p className="admin__resume__right-par" key={index} style={{color:"#00ffe5"}}>
                {`${index+1}.) `}{item.check}
              </p>
            ))
            :<></>
          }

          {!data.additionalRead || data.additionalRead.length===0
            ?<></>
            :<h2 className="admin__resume__right-title">Additional Resources</h2>

          }

          {

            data.additionalRead && data.additionalRead.length!==0
            ?data.additionalRead.map((item,i)=>(
              <AdminCourseUrlPopUp title={item.title} url={item.url} index={i}/>
            ))
            :<></>
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

export default AdminSturcturalRelCoursePopUpDetail
