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
          <img src={data.logo} alt="profilePic"/>

        </div>
        <div className="admin__profileOnView-item">
          <h3> Name:<span>{data.companyName}</span></h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{`About ${data.companyName}`}:</h3>
          <p>{data.about}</p>
          <AdminSources source={data.aboutSource} name="about " id="touch"/>

        </div>

        <div className="admin__profileOnView-item">
        <h3> Main Location (Head Office):<span>{data.MainLocation}</span></h3>
          <h3>Total Number Of Office/Branches:<span>{data.TotalNumberOfBranches}</span></h3>
          <h3>Other Locations:</h3>
          {data.OtherLocations.map((d,i)=>(
            <p key={i}>{d.name}<span className="admin__profileOnView-more"> <a href={d.link} target="_blank" rel="noreferrer">more link</a></span></p>
          ))}

            <AdminSources source={data.LocationSources} name="location " id="touch1"/>
        </div>

        <div className="admin__profileOnView-item">
        {
          data.JobPost.map((item)=>(
            <>
            <h3>Job Post:<span>{item.name}</span></h3>
            <h3>Job Location:<span>{item.location}</span></h3>
            <h3>Job Analysis:</h3>
            {item.analysis.status
              ?<p >{ item.analysis.status} <span className="admin__profileOnView-more" onClick={()=>showStatus(item.analysis)}> more popup</span></p>
              :<></>

            }

            </>
          ))
        }



            <AdminSources source={data.JobPostSources} name="jop post location " id="touch5"/>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{data.EmployeeType}</h3>
          {data.Employee.map((d,i)=>(
            <p key={i}>{`Year: ${d.year}`}<span>{`Number: ${d.numberOfEmployee}`}</span></p>
          ))}

            <AdminSources source={data.EmployeeSource} name="employee " id="touch2"/>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{data.RevenueType}</h3>
          {
            data.Revenue.map((d,i)=>(
              <p key={i}>{`Year: ${d.year}`}:<span>{`Amount: ${d.amount}`}</span></p>
            ))}

              <AdminSources source={data.RevenueSource} name="revenue " id="touch3"/>
        </div>

        <div className="admin__profileOnView-item">
          <h3>Departments/Teams/Jobs</h3>
          {data.Departments.map((d,i)=>(
            <p key={i} >{d.DepartmentName} <span className="admin__profileOnView-more" onClick={()=>showDepInfo(d.DepartmentDesc)}> more popup</span></p>

          ))}

          <AdminSources source={data.DepartmentSource} name="departments " id="touch4"/>
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
