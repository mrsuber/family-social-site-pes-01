import React from 'react'
import './AdminApplicationStages.css'
const AdminApplicationStages = (data) => {
  console.log("stage data",data.statusCheckData.ApplicationStage)
  return (
    <div className="apply__stage-container">
    {
      data.statusCheckData.ApplicationStage.length>0
      ?data.statusCheckData.ApplicationStage.map((item)=>(
        <div className="apply__stage-card">
          <h3 className="apply__stage-title">Card 1</h3>
          <div className="apply__stage-bar">
            <div className="apply__stage-emptybar"></div>
            <div className="apply__stage-filledbar"></div>
          </div>
          <div className="apply__stage-circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle className="apply__stage-stroke" cx="60" cy="60" r="50"/>
          </svg>
          </div>
        </div>
      ))
      :<>no aplication stage yet</>
    }




</div>
  )
}

export default AdminApplicationStages
