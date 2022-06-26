import React,{useState} from 'react'
import './AdminProjectExpansionPreviewPopupTimetable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import {getMonth} from '../../../utils/formatCalenderDays'

import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup,AdminInpuEdit,CalenderHeader,CalenderSideBar,CalenderMonth} from '../../../components'

const AdminProjectExpansionPreviewPopupTimetable = ({setOnView2,onView2=false, data, setOnStructuralDetail,setCompanyName}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)
    const [currentMonth,setCurrentMonth]=useState(getMonth())


      const structural = ()=>{
        setOnView2(false)
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
      onView2===false
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
      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView2(false)}>
      Close
      </button>

      </div>

      <AdminInpuEdit />
      <div className="admin__profileOnveiw-content01">
      <div className="pe1__card">
      <div className="pe-cal__wrapper">
        <CalenderHeader data={data}/>
        <div className="pe-cal__body">
        <CalenderSideBar/>
        <CalenderMonth month={currentMonth}/>

        </div>
      </div>

      </div>
        <button className="admin__profileOnView-sturctur-btn" onClick={()=>setOnView2(false)}>
          <h4>Back</h4>

        </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default AdminProjectExpansionPreviewPopupTimetable
