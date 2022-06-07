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

      {/*
        showCore === true
        ?        <><AdminSturctureProjectExpansionDetails courseName="High commander and Chief" logo={logo} strutureData={pe} setShowCore={setShowCore}/></>
        :<div className="circleContainer">
     <div className="peLogo logo__circle0" style={{width:`${7 * varible}px`, height:`${7 * varible}px`}}>
     <div className="peLogo logo__circle1" style={{width:`${6 * varible}px`, height:`${6 * varible}px`}}>
         <div className="peLogo logo__circle2"style={{width:`${5 * varible}px`, height:`${5 * varible}px`}}>
             <div className="peLogo logo__circle3" style={{width:`${4 * varible}px`, height:`${4 * varible}px`}}>
                 <div className="peLogo logo__circle4" style={{width:`${3 * varible}px`, height:`${3 * varible}px`}}>
                     <div className="peLogo logo__circle5" style={{width:`${2 * varible}px`, height:`${2 * varible}px`}}onClick={() =>setShowCore(true)} >
                         <div className="peLogo logo__circle6" style={{width:`${1 * varible}px`, height:`${1 * varible}px`}} onClick={() =>setShowCore(true)}>
                           <img src={logo} alt="logo" className="peLogo__img" style={{width:`${.5 * varible}px`, height:`${.5 * varible}px`}}/>
                         </div>
                     </div>
                 </div>
                 </div>
             </div>
         </div>
     </div>
     </div>
      */}

      {
        <>
        <div className="logo__body">
        <div className='grain'></div>
<div className='intro'>
  <div className='center'>
    <div className='core'>
    <div className="peLogo logo__circle6 logo__circle6_core" style={{width:`${1 * varible}px`, height:`${1 * varible}px`}} onClick={() =>setShowCore(true)}>
      <img src={logo} alt="logo" className="peLogo__img" style={{width:`${.5 * varible}px`, height:`${.5 * varible}px`}}/>
    </div>
    </div>
    <div className='outer_one'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_one1'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_one2'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_one3'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_one4'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_one5'>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
      <div className='outer_one__piece'></div>
    </div>
    <div className='outer_two'>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
      <div className='outer_two__piece'></div>
    </div>
    <div className='outer_three'>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
      <div className='outer_three__piece'></div>
    </div>
    <div className='outer_four'>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
      <div className='outer_four__piece'></div>
    </div>
    <div className='outer_five'>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
      <div className='outer_five__piece'></div>
    </div>
    <div className='pieces'>
      <div className='future_ui__piece'>
        <span>Warp drive</span>
        <div className='line'></div>
        <div className='tip'>
          Yes, commander!
        </div>
      </div>
      <div className='future_ui__piece'>
        <span>Teleport</span>
        <div className='line'></div>
        <div className='tip'>
          Beam me up!
        </div>
      </div>
      <div className='future_ui__piece'>
        <span>Fusion core</span>
        <div className='line'></div>
        <div className='tip'>
          Engineering!
        </div>
      </div>
      <div className='future_ui__piece'>
        <span>Laser target</span>
        <div className='line'></div>
        <div className='tip'>
          Charge laz0rs!
        </div>
      </div>
      <div className='future_ui__piece'>
        <span>Shields</span>
        <div className='line'></div>
        <div className='tip'>
          Status report!
        </div>
      </div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
      <div className='future_ui__piece blank'></div>
    </div>
  </div>
</div>
</div>
  </>
      }

      </main>
    </div>

    </div>

  )
}

export default AdminProjectExpansionScreen
