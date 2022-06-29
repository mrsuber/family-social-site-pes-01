import React,{useState} from 'react'
import './AdminProjectExpansionPreviewPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import ContextWrapper from '../../../context/ContextWrapper'

import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup,AdminInpuEdit,AdminProjectExpansionPreviewPopupTimetable} from '../../../components'

const AdminProjectExpansionPreviewPopup = ({setOnView,onView=false, data, setOnStructuralDetail,setCompanyName}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)
    const [onView2,setOnView2]=useState(false)
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
      <ContextWrapper>
      <AdminProjectExpansionPreviewPopupTimetable onView2={onView2} setOnView2={setOnView2} data={data}/>
      </ContextWrapper>
      <div className="admin__profileOnView-btn-container">
      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView(false)}>
      Close
      </button>

      </div>

      <AdminInpuEdit/>
      <div className="admin__profileOnveiw-content">
      <div className="pe1__card">
          <header>
              <time className="pe1__time" datetime="2022-06-10T19:00">June 10 - 2022</time>
              <div className="pe1__logo">
                  <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1" viewBox="0 0 234.5 53.7"
                        >

                        <path
                        d="M.6 1.4L116.9 52l117-50.6"
                        className="pe1__path-style"
                        />
                        </svg>
                  </span>

                  <img src={data.logo} alt="logo" className="pe1__img"/>
              </div>
              <div className="pe1__sponsor">{data.title}</div>
          </header>
          <div className="pe1__announcement">
              <h3 className="pe1__h3">Menu</h3>
              <ul className="pe1__ul">
              <li className="pe1__ul-li" onClick={()=>setOnView2(true)}><div className="pe1__ul-li-profile"><span>{data.title}</span><span>{` Timetable`}</span></div></li>

                <li className="pe1__ul-li"><div className="pe1__ul-li-profile"><span>{data.title}</span><span>{` Profile`}</span></div></li>
                <li className="pe1__ul-li"><div className="pe1__ul-li-profile"><span>{data.title}</span><span>{` Achievement`}</span></div></li>
                <li className="pe1__ul-li"><div className="pe1__ul-li-profile"><span>{data.title}</span><span>{` Todos`}</span></div></li>

              </ul>

          </div>
      </div>

    <div className="pe1__inspiration">
    <a rel="noopener" target="_blank" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3794/heartland.jpg">Inspiration</a>
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

export default AdminProjectExpansionPreviewPopup
