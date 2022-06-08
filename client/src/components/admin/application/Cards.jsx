import React,{useState} from 'react'
import './styles.css'
import {AdminApplicationProfileEdit, AdminApplicationProfileView} from '../../../components'

const Cards = ({setOnStructuralDetail,data,setCompanyName,setStatusCheck,setStatusCheckData}) => {

    const [onEdit,setOnEdit] = useState(false)
    const [onView,setOnView] = useState(false)


    const structural = ()=>{

      setOnStructuralDetail(true)
      setCompanyName(data.companyName)
    }

    const status = (data) =>{
      setStatusCheckData(data)
      setStatusCheck(true)
    }

  return (
    <>

    <div  className="admin__revenue-card-apply">
    <AdminApplicationProfileEdit setOnEdit={setOnEdit} onEdit={onEdit}/>
  <AdminApplicationProfileView setOnView={setOnView} onView={onView} data={data} setOnStructuralDetail={setOnStructuralDetail} setCompanyName={setCompanyName}/>
        <div className="admin__rev-content-apply">

            <div className="admin__revenue-card-apply-avatar">
              <img src={data.logo} alt="profilePic" className="admin__revenue-card-apply-avatarimg"/>

            </div>
            <div className="admin__rev-info-apply">
              <h3>{data.companyName}</h3>

            </div>
            <button className="admin__rev-sum-apply" onClick={()=>setOnView(true)}>
              <h4>Profile</h4>

            </button>

            <button className="admin__rev-sum-apply"  onClick={structural}>
              <h4>Sturcture Details</h4>

            </button>
            <button className="admin__rev-sum-apply" onClick={()=>status(data)}>
              <h4>{
                data.ApplicationStatus && data.ApplicationStatus === "Active"
                ?<span style={{color:'#00ff11',fontWeight:"500"}}>
                    {data.ApplicationStatus}</span>
                :<>{data.ApplicationStatus && data.ApplicationStatus === "Employed"?<span style={{color:'#0cb2f3',fontWeight:"500"}}>{data.ApplicationStatus}</span> : <span style={{color:'#feff00',fontWeight:"500"}}>{data.ApplicationStatus}</span>}</>

              }
              {data.ApplicationStatus?"":"Status Unknown"}
              </h4>

            </button>
        </div>

    </div>
    </>
  )
}

export default Cards
