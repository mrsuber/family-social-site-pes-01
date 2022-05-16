import React from 'react'
import './AdminRelSubPopup.css'
const AdminRelSubPopup = ({data,setUnclearPopup}) => {
  return (
    <div className="admin__Unclear-container">
      <div className="admin__Unclear-content">
      <div className="admin__Unclear-btn-container">
      <button className="admin__Unclear-close-btn" onClick={()=>setUnclearPopup(false)}>
      Okay
      </button>
      </div>

      <div className="admin__profileOnView-item">
        <h3 style={{textAlign:'center'}}> Explaining {data.status ? data.status:''} Status</h3>
        <h3> Job Location:<span>{data.jobLocation ? data.jobLocation :''}</span></h3>
        {data.currentOfficeLocation ? <h3> Curent Offices/branches:<span>{data.currentOfficeLocation}</span></h3>:<></>}
      </div>

      <div className="admin__profileOnView-item">
        <h3>{`Details Explaining `}:</h3>
        <p style={{marginTop:"10px",marginBottom:"15px"}}>{data.details1 ? data.details1 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details2 ? data.details2 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details3 ? data.details3 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details4 ? data.details4 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details5 ? data.details5 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details6 ? data.details6 :''}</p>

        {/*<AdminSources source={data.source} name="about " id="s1"/>*/}

      </div>


      </div>


    </div>
  )
}

export default AdminRelSubPopup
