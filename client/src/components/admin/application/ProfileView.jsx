import React,{useState} from 'react'
import './profileView.css'
import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup} from '../../../components'

const ProfileEdit = ({setOnView,onView=false, data, setOnStructuralDetail,setCompanyName}) => {
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
          <h3> Name:{data.companyName? <span>{data.companyName}</span> : <span className="admin__worning-update">update company name</span>}</h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{`About ${data.companyName ? data.companyName:<span className="admin__worning-update">update company</span>}`}:</h3>
          <p>{data.about?data.about : <span className="admin__worning-update">update about content</span>}</p>
          {data.aboutSource && data.aboutSource.length!==0? <AdminSources source={ data.aboutSource} name="about " id="touch"/>:<span className="admin__worning-update">update About sources</span>}

        </div>

        <div className="admin__profileOnView-item">
        <h3> Main Location (Head Office):<span>{data.MainLocation ? data.MainLocation :<span className="admin__worning-update">update head Office location</span>}</span></h3>
          <h3>Total Number Of Office/Branches:<span>{data.TotalNumberOfBranches ? data.TotalNumberOfBranches : <span className="admin__worning-update">update number of Branches</span>}</span></h3>
          <h3>Other Locations:</h3>
          {data.OtherLocations && data.OtherLocations.length!==0? data.OtherLocations.map((d,i)=>(
            <p key={i}>{d.name}<span className="admin__profileOnView-more"> <a href={d.link} target="_blank" rel="noreferrer">more link</a></span></p>
          )):<p><span className="admin__worning-update">update other Locations</span></p>}

            {/*data.LocationSources && <AdminSources source={data.LocationSources} name="location " id="touch1"/>*/}
            {data.LocationSources && data.LocationSources.length!==0? <AdminSources source={ data.LocationSources} name="about " id="touch1"/>:<span className="admin__worning-update">update About Location</span>}

        </div>

        <div className="admin__profileOnView-item">
        {
          data.JobPost && data.JobPost!==0? data.JobPost.map((item)=>(
            <>
            <h3>Job Post:<span>{item.name && item.name}</span></h3>
            <h3>Job Location:<span>{item.location && item.location}</span></h3>
            <h3>Job Analysis:</h3>
            {item.analysis
              ?<p >{ item.analysis.status? item.analysis.status:<span className="admin__worning-update">update Analysis status</span>} <span className="admin__profileOnView-more" onClick={()=>showStatus(item.analysis)}> more popup</span></p>
              :<></>

            }

            </>
          )):<>
          <h3>Job Post:<span className="admin__worning-update">update Job Post:</span></h3>
          <h3>Job Location:<span className="admin__worning-update">update Job Location</span></h3>
          <h3>Job Analysis:<span className="admin__worning-update">update Job Analysis</span></h3>
          </>
        }




            {data.JobPostSources && data.JobPostSources.length!==0? <AdminSources source={ data.JobPostSources} name="about " id="touch5"/>:<span className="admin__worning-update">update Job post source</span>}

        </div>

        <div className="admin__profileOnView-item">
          <h3>{data.EmployeeType ? data.EmployeeType :<span className="admin__worning-update">update Employee type</span>}</h3>
          {data.Employee && data.Employee!==0? data.Employee.map((d,i)=>(
            <p key={i}>{`Year: ${d.year}`}<span>{`Number: ${d.numberOfEmployee}`}</span></p>
          )):<p>{`Year: ${<span className="admin__worning-update">update Year</span>}`}<span>{`Number: ${<span className="admin__worning-update">update Number</span>}`}</span></p>}


            {data.EmployeeSource && data.EmployeeSource.length!==0? <AdminSources source={ data.EmployeeSource} name="about " id="touch2"/>:<span className="admin__worning-update">update Employee source</span>}

        </div>

        <div className="admin__profileOnView-item">
          <h3>{data.RevenueType?data.RevenueType : <span className="admin__worning-update">update Revenue Type</span>}</h3>
          {
            data.Revenue && data.Revenue.length!==0? data.Revenue.map((d,i)=>(
              <p key={i}>{`Year: ${d.year}`}:<span>{`Amount: ${d.amount}`}</span></p>
            )):<p>{`Year: ${<span className="admin__worning-update">update Year</span>}`}:<span>{`Amount: ${<span className="admin__worning-update">update Amount</span>}`}</span></p>}


              {data.RevenueSource && data.RevenueSource.length!==0? <AdminSources source={ data.RevenueSource} name="about " id="touch3"/>:<span className="admin__worning-update">update Revenue source</span>}

        </div>

        <div className="admin__profileOnView-item">
          <h3>Departments/Teams/Jobs</h3>
          {data.Departments && data.Departments.length!==0?data.Departments.map((d,i)=>(
            <p key={i} >{d.DepartmentName} <span className="admin__profileOnView-more" onClick={()=>showDepInfo(d.DepartmentDesc)}> more popup</span></p>

          )): <p><span className="admin__worning-update">update Year</span></p>
}


          {data.DepartmentSource && data.DepartmentSource.length!==0? <AdminSources source={ data.DepartmentSource} name="about " id="touch4"/>:<span className="admin__worning-update">update Department source</span>}

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

export default ProfileEdit
