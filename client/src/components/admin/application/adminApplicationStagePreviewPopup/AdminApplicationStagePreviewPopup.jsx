import React,{useState} from 'react'
import './AdminApplicationStagePreviewPopup.css'
import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup} from '../../../../components'

const AdminApplicationStagePreviewPopup = ({setOnView,onView=false, data, structural}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)

      // const structural = ()=>{
      //   setOnView(false)
      //   setCompanyName(data.learningTitle)
      //   setOnStructuralDetail(true)
      //
      // }

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
      <div className="admin__profileOnveiw-container">
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
          {data.aboutPopUp.length >0
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


      </div>
      </>
    }</>

  )
}

export default AdminApplicationStagePreviewPopup
