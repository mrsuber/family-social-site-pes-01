import React,{useState} from 'react'
import './AdminSchoolCards.css'
import {Link} from 'react-router-dom'
// import {AdminApplicationProfileEdit, AdminApplicationProfileView} from '../../../components'
import {AdminSchoolPreviewPopup} from '../../../components'
import {useDispatch,useSelector} from 'react-redux'

const Cards = ({data,logo}) => {

    const {auth} = useSelector(state=>state)
    const [onEdit,setOnEdit] = useState(false)
    const [onView,setOnView] = useState(false)


    // const structural = ()=>{
    //
    //   setOnStructuralDetail(true)
    //   setCompanyName(data.companyName)
    // }

  return (
    <>

    <div  className="admin__revenue-card-apply">
  { /* <AdminApplicationProfileEdit setOnEdit={setOnEdit} onEdit={onEdit}/>
  <AdminApplicationProfileView setOnView={setOnView} onView={onView} data={data} setOnStructuralDetail={setOnStructuralDetail} setCompanyName={setCompanyName}/>

      */}
      <AdminSchoolPreviewPopup setOnView={setOnView} onView={onView} data={data} />

      <div className="admin__rev-content-apply">

            <div className="admin__revenue-card-apply-avatar">
              <img src={logo} alt="profilePic" className="admin__revenue-card-apply-avatarimg"/>
              <p>Dev</p>
            </div>
            <div className="admin__rev-info-apply">
              <h3>{data.learningTitle}</h3>

            </div>
            <button className="admin__rev-sum-apply" onClick={()=>setOnView(true)}>
              <h4>Profile</h4>

            </button>


            <Link to={data.courseLink?data.courseLink:'/admin/student'} className="admin__rev-sum-apply" style={{textDecoration: "none",color: "inherit"}}>
              <h4>Details</h4>

            </Link>

        </div>

    </div>
    </>
  )
}

export default Cards
