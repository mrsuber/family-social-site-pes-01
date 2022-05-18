import React from 'react'
import './UnclearPopup.css'
import {AdminSources} from '../../../../components'
const UnclearPopup = ({data,setUnclearPopup}) => {
  console.log(data)
  return (
    <div className="admin__Unclear-container">
      <div className="admin__Unclear-content">
      <div className="admin__Unclear-btn-container">
      <button className="admin__Unclear-close-btn" onClick={()=>setUnclearPopup(false)}>
      Okay
      </button>
      </div>

      <div className="admin__profileOnView-item">
        {data.name && <h3 style={{textAlign:'center'}}> Explaining {data.name}</h3>}

        {data.status && <h3 style={{textAlign:'center'}}> Explaining {data.status} Status</h3>}
        {data.jobLocation && <h3> Job Location:<span>{data.jobLocation}</span></h3>}
        {data.currentOfficeLocation ? <h3> Curent Offices/branches:<span>{data.currentOfficeLocation}</span></h3>:<></>}
      </div>

      <div className="admin__profileOnView-item">
        {data.details1 && <h3>{`Details Explaining `}:</h3>}
        <p style={{marginTop:"10px",marginBottom:"15px"}}>{data.details1 ? data.details1 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details2 ? data.details2 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details3 ? data.details3 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details4 ? data.details4 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details5 ? data.details5 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details6 ? data.details6 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details7 ? data.details7 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details8 ? data.details8 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details9 ? data.details9 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details10 ? data.details10 :''}</p>
        <p style={{marginBottom:"15px"}}>{data.details11 ? data.details11 :''}</p>

        {data.popUpSources && data.popUpSources.length>0 ? <AdminSources source={data.popUpSources} name={data.popUpSources[0].name} id="pop1"/>:<p>no refrence link</p>}

      </div>


      </div>


    </div>
  )
}

export default UnclearPopup
