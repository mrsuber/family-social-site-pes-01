import React,{useState} from 'react'
import './AdminProjectExpansionPreviewPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';

import {AdminSources,AdminUnclearPopup,DepartmentInfoPopup,AdminInpuEdit} from '../../../components'

const AdminProjectExpansionPreviewPopup = ({setOnView,onView=false, data, setOnStructuralDetail,setCompanyName}) => {
    const [unclearPopup,setUnclearPopup] = useState(false)
    const [analysisData,setAnalysisData]=useState(null)
    const[depPopup, setDepPopup] = useState(false)
    const[depData,setDepData] = useState(null)
    console.log(data)
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
              <h3 className="pe1__h3">profile Unknown</h3>
              <h1 className="pe1__h1">Candidate Unknown</h1>
              <h3 className="pe1__italic pe1__h3">Mission Unkown</h3>
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
