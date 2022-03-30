import React,{useState} from 'react'
import './AdminApplicationScreen.css'

import {AdminSideBar,AdminApplicationStructure,AdminApplicationCard} from '../../../components'
import {profile,logo,pic} from '../../../images'
import logo2 from '../../../images/admin/google_logo.jpg'
import logo3 from '../../../images/admin/Oracle_Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'


const companyData = [
  {
    companyName:"Google",
    logo:logo2,
    about:"Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include a search engine, online advertising technologies, cloud computing, software, and hardware. It has been referred to as the 'most powerful company in the world' and one of the world's most valuable brands due to its market dominance, data collection, and technological advantages in the area of artificial intelligence. It is considered one of the Big Five American information technology companies, alongside Amazon, Apple, Meta and Microsoft.",
    aboutSourceTitle:"wikipedia",
    aboutSourceLink:"https://en.wikipedia.org/wiki/Google",
    fulltimeEmployee:[
      {
        year:"2020",
        numberOfEmployee:"135,301"
    },
    {
      year:"2021",
      numberOfEmployee:"156,500"
  },

],
    FulltimeEmployeeSourceTitle:"statista.com",
    FulltimeEmployeeSourceLink:"https://www.statista.com/statistics/273744/number-of-full-time-google-employees/"

  }
]


const AdminApplicationScreen = () => {
    const {auth} = useSelector(state=>state)
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
    activeLink3="admin__active"
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
          <h1>Welcome To Applications Tracking</h1>
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
                <AdminApplicationCard logo={logo2} setOnStructuralDetail={setOnStructuralDetail}/>
                 <AdminApplicationCard logo={logo3} setOnStructuralDetail={setOnStructuralDetail}/>
                 <AdminApplicationCard logo={logo2} setOnStructuralDetail={setOnStructuralDetail}/>
                 <AdminApplicationCard logo={logo2} setOnStructuralDetail={setOnStructuralDetail}/>
              </div>
          </section>
          </main>
          </>
          :<><AdminApplicationStructure logo={logo2} setOnStructuralDetail={setOnStructuralDetail}/></>
        }






    </div>

    </div>
  )
}

export default AdminApplicationScreen
