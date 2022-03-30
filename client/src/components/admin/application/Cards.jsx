import React,{useState} from 'react'
import './styles.css'
import {AdminApplicationProfileEdit, AdminApplicationProfileView} from '../../../components'

const Cards = ({profile,company_name,setOnStructuralDetail,logo}) => {

    const [onEdit,setOnEdit] = useState(false)
    const [onView,setOnView] = useState(false)

  return (
    <>

    <div  className="admin__revenue-card-apply">
    <AdminApplicationProfileEdit setOnEdit={setOnEdit} onEdit={onEdit}/>
  <AdminApplicationProfileView setOnView={setOnView} onView={onView} logo={logo} setOnStructuralDetail={setOnStructuralDetail}/>
        <div className="admin__rev-content-apply">

            <div className="admin__revenue-card-apply-avatar">
              <img src={logo} alt="profilePic" className="admin__revenue-card-apply-avatarimg"/>

            </div>
            <div className="admin__rev-info-apply">
              <h3>{company_name} Google</h3>

            </div>
            <button className="admin__rev-sum-apply" onClick={()=>setOnView(true)}>
              <h4>Profile</h4>

            </button>

            <button className="admin__rev-sum-apply">
              <h4>Sturcture Details</h4>

            </button>
            <button className="admin__rev-sum-apply">
              <h4>Activated</h4>

            </button>
        </div>

    </div>
    </>
  )
}

export default Cards
