import React,{useState} from 'react'
import './AdminSchoolPreviewPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';

import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup,AdminInpuEdit} from '../../../components'

const AdminSchoolPreviewPopup = ({setOnView,onView=false, data, setOnStructuralDetail,setCompanyName}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)

      const structural = ()=>{
        setOnView(false)
        setCompanyName(data.companyName)
        setOnStructuralDetail(true)

      }

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

      <AdminInpuEdit/>
      <div className="admin__profileOnveiw-content">
        <div className="admin__profileOnveiw-avatar">
          {data.logo
            ?<> <img src={data.logo} alt="profilePic"/><div><span className="adminEditButton"><FontAwesomeIcon icon={faPlus}/>Add source</span></div></>
            :<><span className="admin__worning-update">update logo</span><span className="adminEditButton"><FontAwesomeIcon icon={faPlus}/>Add source</span></>
          }
        </div>


        <div className="admin__profileOnView-item">
        <h3> Name:{data.learningTitle? <span>{data.learningTitle}</span> : <span className="admin__worning-update">update learning Title</span>}<span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>

          <h3> Path:{data.path? <span>{data.path}</span> : <span className="admin__worning-update">update study path name</span>}<span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>

        </div>

        <div className="admin__profileOnView-item">
          <h3>{`About ${data.path ? data.path:<span className="admin__worning-update">update path name</span>}`}:<span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          <p>{data.about?data.about : <span className="admin__worning-update">update about content</span>}<span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></p>
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
        <h3> Main Location (Head Office):<span>{data.MainLocation ? data.MainLocation :<span className="admin__worning-update">update head Office location</span>}</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          <h3>Total Number Of Office/Branches:<span>{data.TotalNumberOfBranches ? data.TotalNumberOfBranches : <span className="admin__worning-update">update number of Branches</span>}</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          <h3>Other Locations:<span className="adminEditButton"><FontAwesomeIcon icon={faPlus}/></span></h3>
          {data.OtherLocations && data.OtherLocations.length!==0? data.OtherLocations.map((d,i)=>(
            <p key={i}>{d.name}<span className="admin__profileOnView-more"> <a href={d.link} target="_blank" rel="noreferrer">more link</a></span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></p>
          )):<p><span className="admin__worning-update">update other Locations</span></p>}


        </div>

        <div className="admin__profileOnView-item">
        {
          data.JobPost && data.JobPost!==0? data.JobPost.map((item)=>(
            <div style={{borderTop:"1px solid blue",marginBottom:"15px", marginTop:"15px"}}>
            <h3>Job Post:<span>{item.name && item.name}</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
            <h3>Job Location:<span>{item.location && item.location}</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
            <h3>Job Details:</h3>
                <p>{item.details && item.details }<span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></p>
            <h3>Job Analysis:</h3>
            {item.analysis
              ?<p >
                    { item.analysis.status
                        ? item.analysis.status
                        :<span className="admin__worning-update">update Analysis status</span>
                    }
                    <span className="admin__profileOnView-more" onClick={()=>showStatus(item.analysis)}>
                    more popup
                    </span>
                    <span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span>
                </p>


              :<></>

            }

            </div>
          )):<>
          <h3>Job Post:<span className="admin__worning-update">update Job Post:</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          <h3>Job Location:<span className="admin__worning-update">update Job Location</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          <h3>Job Analysis:<span className="admin__worning-update">update Job Analysis</span><span className="adminEditButton"><FontAwesomeIcon icon={faEdit}/></span></h3>
          </>
        }




            {data.JobPostSources && data.JobPostSources.length!==0? <AdminSources source={ data.JobPostSources} name="about " id="touch5"/>:<><span className="admin__worning-update">Add Job post source</span><span className="adminEditButton"><FontAwesomeIcon icon={faPlus}/></span></>}
            <span className="adminEditButton"><FontAwesomeIcon icon={faPlus}/>{'  '}Add source</span>
        </div>







        <button className="admin__profileOnView-sturctur-btn" onClick={()=>setOnView(false)}>
          <h4>Back</h4>

        </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default AdminSchoolPreviewPopup
