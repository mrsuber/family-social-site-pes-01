import React,{useState} from 'react'
import './Student.css'

import {AdminSchoolCards,AdminSideBar} from '../../../components'
import {profile,logo,pic} from '../../../images'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {schoolData} from '../../../data/learningData'

const StudentScreen = () => {
    const {auth} = useSelector(state=>state)
    const [school,setSchool]=useState(schoolData)

    const [companyName, setCompanyName]=useState(null)
    const [onStructuralDetail,setOnStructuralDetail] = useState(false)
    const dispatch = useDispatch()



  return (
    <div className="admin__body">
    <input type="checkbox" name="admin__menu-toggle" id="admin__menu-toggle"/>
    <div className="admin__overlay">
    <label for="admin__menu-toggle">
      </label>
    </div>
    <AdminSideBar
    img={ auth.user.profilePic ? auth.user.profilePic :profile}
    logo={logo}
    pic={pic}
    activeLink7="admin__active"
    fullname={auth.user.fullname }
    username={auth.user.username}
    />
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Welcome To Student Tracking</h1>
          <p>This is sensitive Data<span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <button className="admin__btn admin__btn-main" onClick={()=>dispatch(logout())}>
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faHome} /></span>
              Log Out
          </button>
        </div>
      </header>

        {
          onStructuralDetail===false
          ?<>
          <main className="admin__main">
          <section>

              <div className="admin__block-grid-apply">
              {
                school && school.map((data,index)=>(
                  <AdminSchoolCards data={data} logo={logo} setOnStructuralDetail={setOnStructuralDetail} setCompanyName={setCompanyName} key={index}/>
                ))

              }


              </div>
          </section>
          </main>
          </>
          :<>{/*<AdminApplicationStructure companyName={companyName} cardData={cardData} strutureData={sturtureData} setOnStructuralDetail={setOnStructuralDetail}/>*/}</>
        }






    </div>

    </div>
  )
}

export default StudentScreen
