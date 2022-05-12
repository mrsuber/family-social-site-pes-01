import React,{useState} from 'react'
import './AdminRelCoursePreviewPopup.css'
import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup} from '../../../components'

const AdminRelCoursePreviewPopup = ({setOnView,onView=false, data, structural}) => {
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

      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView(false)}>
      Edit
      </button>
      </div>


      <div className="admin__profileOnveiw-content">
        <div className="admin__profileOnveiw-avatar">
          {data.logo
            ? <img src={data.logo} alt="profilePic"/>
            :<span className="admin__worning-update">update logo</span>
          }

        </div>
        <div className="admin__profileOnView-item">

          <h3> Name:{data.path? <span>{data.path}</span> : <span className="admin__worning-update">update study path name</span>}</h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{`About ${data.path ? data.path:<span className="admin__worning-update">update path name</span>}`}:</h3>
          <p style={{marginBottom:'20px'}}>{data.about?data.about : <span className="admin__worning-update">update about content</span>}</p>
          <p style={{marginBottom:'20px'}}>{data.about2?data.about2 : <span className="admin__worning-update">update about content</span>}</p>

        </div>

        <div className="admin__profileOnView-item">
          <h3>Total Number of Lessons:<span>{data.TotalNumberOfBranches ? data.TotalNumberOfBranches : <span className="admin__worning-update">update number of Branches</span>}</span></h3>
          <h3>Lessons Tittle:</h3>
          {data.LessonTittle && data.LessonTittle.length!==0? data.LessonTittle.map((d,i)=>(
            <p key={i}>{i+1}.) {d.title}</p>
          )):<p><span className="admin__worning-update">update other Locations</span></p>}


        </div>




        <button className="admin__profileOnView-sturctur-btn" onClick={structural}>
          <h4>Structural Details</h4>

        </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default AdminRelCoursePreviewPopup
