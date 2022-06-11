import React,{useState} from 'react'
import './AdminApplicationStagePreviewPopup.css'
import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup,AdminCourseImagePopUp,AdminCourseUrlPopUp} from '../../../../components'



const AdminApplicationStagePreviewPopup = ({setOnView,onView=false, data, structural}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)



      const showStatus = (data)=>{
        setAnalysisData(data)
        setUnclearPopup(true)
      }

      const showDepInfo = (data)=>{
        setDepData(data)
        setDepPopup(true)
      }

  return (
    <>{
      onView===false
      ? <></>
      : <>
      {unclearPopup
        ?<AdminUnclearPopup data={analysisData} setUnclearPopup={setUnclearPopup} />
        :<></>
}
    {depPopup
      ?<DepartmentInfoPopup data={depData} setDepPopup={setDepPopup} />
      :<></>
}
      {data.stageAnalysis
        ?<>
        <div className="admin__profileOnveiw-container" style={{background:'#2d88ee08'}}>



        <div className="admin__profileOnveiw-content33">

        <div className="admin__main-resume-container">
        <div className="admin__resume__left-side">
          <div className="admin__resume__profileText">



            <div className="admin__resume__img-box admin__resume__img-box22">
            <div className="apply__stage-circle2">

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,186,0,1)" />
                    <stop offset="65%" stop-color="rgba(217,147,0,1)" />

                    <stop offset="100%" stop-color="rgba(0,154,217,1)" />
                  </linearGradient>
                </defs>
              <circle className="apply__stage-stroke" cx="60" cy="60" r="50" stroke="url(#gradient)" stroke-width="6"  style={{strokeDashoffset:`${360 - ((data.menu.length/666)*100).toFixed(2) * 3.6}`}}/>

            </svg>

                <div style={{marginBottom:'10px'}}>
                <span>{data.menu && ((data.menu.length/666)*100).toFixed(2)}% complete</span><br/>
                <span>{data.menu && data.menu.length} Days So Far</span>
                </div>
            </div>


            </div>
          </div>
          <div className="admin__resume__contactInfo">
            <h3 className="admin__resume__title">Side Company Menu</h3>
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
                {item.detail7 &&<p className="admin__resume__right-par">
                  {item.detail7}
                </p>}
                {item.detail8 &&<p className="admin__resume__right-par">
                  {item.detail8}
                </p>}
                {item.detail9 &&<p className="admin__resume__right-par">
                  {item.detail9}
                </p>}
                {item.detail10 &&<p className="admin__resume__right-par">
                  {item.detail10}
                </p>}
                {item.detail11 &&<p className="admin__resume__right-par">
                  {item.detail11}
                </p>}
                {item.detail12 &&<p className="admin__resume__right-par">
                  {item.detail12}
                </p>}
                {item.detail13 &&<p className="admin__resume__right-par">
                  {item.detail13}
                </p>}
                {item.detail14 &&<p className="admin__resume__right-par">
                  {item.detail14}
                </p>}
                {item.detail15 &&<p className="admin__resume__right-par">
                  {item.detail15}
                </p>}
                {item.detail16 &&<p className="admin__resume__right-par">
                  {item.detail16}
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
        :<div className="admin__profileOnveiw-container">
      <div className="admin__profileOnView-btn-container">
      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView(false)}>
      Close
      </button>

      </div>


      <div className="admin__profileOnveiw-content">

        <div className="admin__profileOnView-item">

          <h3> Name:{data.stageName? <span>{data.stageName}</span> : <span className="admin__worning-update">update study stage name</span>}</h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{`About ${data.stageName ? data.stageName:<span className="admin__worning-update">update stage name</span>}`}:</h3>
          <p style={{marginBottom:'20px'}}>{data.about?data.about : <span className="admin__worning-update">update about content</span>}</p>
          <p style={{marginBottom:'20px'}}>{data.about2?data.about2 : <></>}</p>
          <p style={{marginBottom:'20px'}}>{data.about3?data.about3 : <></>}</p>
            <p style={{marginBottom:'20px'}}>{data.about4?data.about4 : <></>}</p>
            <p style={{marginBottom:'20px'}}>{data.about5?data.about5 : <></>}</p>
          <div>
          {(data.aboutPopUp && data.aboutPopUp.length >0)
            ? data.aboutPopUp.map((item)=>(<span className="admin__profileOnView-more decorating_pop" onClick={()=>showStatus(item)}>
          {`${item.name} pop`}
          </span>))
          :<></>
        }
        </div>
        </div>

        <div className="admin__profileOnView-item">
          {data.TotalNumberOfBranches ? <h3>Total Number of Lessons:<span>{ data.TotalNumberOfBranches }</span></h3>: <></>}
          {data.LessonTittle && <h3>Lessons Tittle:</h3>}
          {data.LessonTittle && data.LessonTittle.length!==0? data.LessonTittle.map((d,i)=>(
            <p key={i}>{i+1}.) {d.title}</p>
          )):<></>}


        </div>
        {data.aboutSource && data.aboutSource.length!==0? <AdminSources source={ data.aboutSource} name="about " id="islamRel"/>:<></>}




      </div>


      </div>}
      </>
    }</>

  )
}

export default AdminApplicationStagePreviewPopup
