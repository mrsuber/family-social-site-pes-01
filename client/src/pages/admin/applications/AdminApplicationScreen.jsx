import React,{useState,useEffect} from 'react'
import './AdminApplicationScreen.css'

import {AdminSideBar,AdminApplicationStructure,AdminApplicationCard} from '../../../components'
import {profile,logo,pic} from '../../../images'
import logo2 from '../../../images/admin/google_logo.jpg'
import logo3 from '../../../images/admin/Oracle_Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {companyData} from '../../../data/companyData'
import {companyStructuralData} from '../../../data/companySturcturalData'
import axios from 'axios'


const AdminApplicationScreen = () => {
    const {auth} = useSelector(state=>state)
    const [cardData,setCardData]=useState(companyData)
    const [sturtureData,setSturtureData] = useState(companyStructuralData)
    const [companyName, setCompanyName]=useState(null)
    const [onStructuralDetail,setOnStructuralDetail] = useState(false)
    const dispatch = useDispatch()


    useEffect(()=>{
      const getCompanyData = async ()=>{
        const res = await axios.get("https://raw.githubusercontent.com/mrsuber/Data/master/companyData.json")
        console.log("company Data",res)
      }
      getCompanyData()
    },[])
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
              {
                cardData && cardData.map((data,index)=>(
                  <AdminApplicationCard data={data} setOnStructuralDetail={setOnStructuralDetail} setCompanyName={setCompanyName} key={index}/>
                ))

              }


              </div>
          </section>
          </main>
          </>
          :<><AdminApplicationStructure companyName={companyName} cardData={cardData} strutureData={sturtureData} setOnStructuralDetail={setOnStructuralDetail}/></>
        }






    </div>

    </div>
  )
}

export default AdminApplicationScreen
