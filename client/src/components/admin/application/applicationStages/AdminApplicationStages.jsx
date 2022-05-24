import React,{useState} from 'react'
import './AdminApplicationStages.css'
import {AdminApplicationStagePreviewPopup} from '../../../../components'
const AdminApplicationStages = (data) => {
  console.log("stage data", data)

  const [onView,setOnView] = useState(false)
  const [popupData,setPopupData] = useState([])
  const startpopup = (data) =>{
    setPopupData(data)
    setOnView(true)
  }


  return (
    <>
    <AdminApplicationStagePreviewPopup setOnView={setOnView} onView={onView} data={popupData}/>
    <div className="apply__stage-container">

    {
      data.statusCheckData.ApplicationStage.length>0
      ?data.statusCheckData.ApplicationStage.map((item)=>(
        <div className="apply__stage-card" onClick={()=>startpopup(item)}>
          <h3 className="apply__stage-title" style={{fontSize:"15px",color:"rgba(0,154,217,1)",fontWeight:"500"}}>{item.stageName}</h3>
          <div className="apply__stage-bar">
            <div className="apply__stage-emptybar"></div>
            <div className="apply__stage-filledbar" style={{width:`${item.stagePercent}%`}}></div>
            <span></span>
          </div>
          <div className="apply__stage-circle">
            <span>{item.stagePercent}% complete</span>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255,186,0,1)" />
                  <stop offset="65%" stop-color="rgba(217,147,0,1)" />

                  <stop offset="100%" stop-color="rgba(0,154,217,1)" />
                </linearGradient>
              </defs>
            <circle className="apply__stage-stroke" cx="60" cy="60" r="50" stroke="url(#gradient)" stroke-width="6"  style={{strokeDashoffset:`${360 - item.stagePercent * 3.6}`}}/>

          </svg>

          </div>
        </div>
      ))
      :<>no aplication stage yet</>
    }




</div>
</>
  )
}

export default AdminApplicationStages
