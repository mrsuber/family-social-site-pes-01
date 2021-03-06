import React,{useState} from 'react'
import './AdminCourseCard.css'
// import {AdminApplicationProfileEdit, AdminApplicationProfileView} from '../../../components'
import {AdminCoursePreviewPopup} from '../../../components'

const AdminCourseCard = ({data,logo,setOnStructuralDetail,setCourseName}) => {

    const [onView,setOnView] = useState(false)


    const structural = ()=>{

      setOnStructuralDetail(true)
      setCourseName(data.learningTitle)
    }

  return (
    <>

    <div  className="admin__revenue-card-apply">

  { /* <AdminApplicationProfileEdit setOnEdit={setOnEdit} onEdit={onEdit}/>
  <AdminApplicationProfileView setOnView={setOnView} onView={onView} data={data} setOnStructuralDetail={setOnStructuralDetail} setCompanyName={setCompanyName}/>

      */}
      <AdminCoursePreviewPopup setOnView={setOnView} onView={onView} data={data} structural={structural} />

      <div className="admin__rev-content-apply">


            <div className="admin__revenue-card-apply-avatar">
              <img src={logo} alt="profilePic" className="admin__revenue-card-apply-avatarimg"/>
              <p>Dev</p>
            </div>
            <div className="admin__rev-info-apply">
              <h3>{data.learningTitle}</h3>

            </div>
            <button className="admin__rev-sum-apply" onClick={()=>setOnView(true)}>
              <h4>Profile({data.TotalNumberCompleted? data.TotalNumberCompleted :"0"} - {data.TotalNumberOfBranches?data.TotalNumberOfBranches:"0"})</h4>

            </button>

            <button className="admin__rev-sum-apply"  onClick={structural}>
              <h4>Sturcture Details</h4>

            </button>

        </div>

    </div>
    </>
  )
}

export default AdminCourseCard
