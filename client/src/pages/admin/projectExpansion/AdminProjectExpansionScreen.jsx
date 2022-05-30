import React , {useState,useEffect} from 'react'
import './AdminProjectExpansionScreen.css'

import {AdminSideBar,AdminSturctureProjectExpansionDetails} from '../../../components'
import {profile,logo,pic} from '../../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {prodjectExpansionData} from '../../../data/prodjectExpansionFirstData'

let varible = 60;
const AdminProjectExpansionScreen = () => {
    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [pe,setPe]= useState([])
    const [showCore,setShowCore] = useState(false)
    useEffect(()=>{
      setPe(prodjectExpansionData)
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
    activeLink10="admin__active"
    fullname={auth.user.fullname ? auth.user.fullname:'Mohamad Demo'}
    username={auth.user.username ?`Welcome ${auth.user.username}` :`Welcom to Demo Account`}
    />
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Welcome To Project Expansion</h1>
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

      <main className="admin__main-expense">

      {
        showCore === true
        ?        <><AdminSturctureProjectExpansionDetails courseName="Islam" logo={logo} strutureData={pe} setShowCore={setShowCore}/></>
        :<div className="circleContainer">
     <div class="peLogo logo__circle0" style={{width:`${7 * varible}px`, height:`${7 * varible}px`}}>
     <div class="peLogo logo__circle1" style={{width:`${6 * varible}px`, height:`${6 * varible}px`}}>
         <div class="peLogo logo__circle2"style={{width:`${5 * varible}px`, height:`${5 * varible}px`}}>
             <div class="peLogo logo__circle3" style={{width:`${4 * varible}px`, height:`${4 * varible}px`}}>
                 <div class="peLogo logo__circle4" style={{width:`${3 * varible}px`, height:`${3 * varible}px`}}>
                     <div class="peLogo logo__circle5" style={{width:`${2 * varible}px`, height:`${2 * varible}px`}}onClick={() =>setShowCore(true)} >
                         <div class="peLogo logo__circle6" style={{width:`${1 * varible}px`, height:`${1 * varible}px`}} onClick={() =>setShowCore(true)}>
                           <img src={logo} alt="logo" className="peLogo__img" style={{width:`${.5 * varible}px`, height:`${.5 * varible}px`}}/>
                         </div>
                     </div>
                 </div>
                 </div>
             </div>
         </div>
     </div>
     </div>
      }

      </main>
    </div>

    </div>

  )
}

export default AdminProjectExpansionScreen
