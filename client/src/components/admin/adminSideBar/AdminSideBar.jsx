import React from 'react'
import './AdminSideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar,faCog,faUser,faArrowDown,faAdjust,faChartBar,faChartLine} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const AdminSideBar = ({img,logo,activeLink,activeLink2,activeLink3, activeLink4,activeLink5,activeLink6,activeLink7,activeLink8,activeLink9, fullname='Mohamad Demo',username='Demo User'}) => {
  const {auth} = useSelector(state => state)
  return (
    <div className="admin__sidebar">
      <div className="admin__sidebar-container">
        <div className="admin__sidebar-brand">
          <h2>
              <span className="admin__lab admin__la-staylinked"><img className="admin__logo" src={logo} alt="logo" /></span>
              Suber
          </h2>
        </div>
        <div className="admin__sidebar-avartar">
          <div>
            <img className="admin__img" src={img} alt="avatar"/>
          </div>
          <div className="admin__avartar-info">
            <div className="admin__avartar-text">
              <h4>{fullname}</h4>
              <small>{`Welcome ${username}`}</small>
            </div>
            <span className="admin__las admin__la-arrow-down"><FontAwesomeIcon icon={faArrowDown} /></span>

          </div>
        </div>
        <div className="admin__sidebar-menu">
          <ul>
            <li>
              <Link to="/admin" className={activeLink}>
                <span className="admin__las admin__la-adjust"><FontAwesomeIcon icon={faAdjust} /></span>
                <span>Dashboard</span>
              </Link>
            </li>

            {/*<li>
              <Link to="/admin/expense" className={activeLink2}>
                <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faChartLine} /></span>
                <span>Track Expense</span>{auth.token && auth.user.isSuperAdmin===true?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li>*/}

            {auth.token &&  (auth.user.isApplication1===true || auth.user.isSuperAdmin===true)? <li>
              <Link to="/admin/application/oracle" className={activeLink6}>
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>Oracle Applications</span>{auth.token && (auth.user.isApplication1===true || auth.user.isSuperAdmin===true)?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li> :<></>}
            {auth.token &&  (auth.user.isApplication2===true || auth.user.isSuperAdmin===true)? <li>
              <Link to="/admin/application/hippo" className={activeLink9}>
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>Hippo Education Appl...</span>{auth.token && (auth.user.isApplication2===true || auth.user.isSuperAdmin===true)?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li> :<></>}
            {auth.token &&  (auth.user.isStudentTech===true || auth.user.isSuperAdmin===true)? <li>
              <Link to="/admin/devcourse" className={activeLink8}>
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>Web Developement</span>{auth.token && (auth.user.isStudentTech===true || auth.user.isSuperAdmin===true)?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li> :<></>}

            <li>
              <Link to="/admin/application" className={activeLink3}>
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>Track Applications</span>{auth.token && auth.user.isSuperAdmin===true?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li>

            <li>
              <Link to="/admin/school" className={activeLink7}>
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>School</span>{auth.token && auth.user.isSuperAdmin===true?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li>

            {/*<li>
              <Link to="/admin/expense" className={activeLink4}>
                <span className="admin__las admin__la-calendar"><FontAwesomeIcon icon={faCalendar} /></span>
                <span>Schedule</span>{auth.token && auth.user.isSuperAdmin===true?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li>*/}

            <li>
              <Link to="/admin/expense" className={activeLink5}>
                <span className="admin__las admin__la-user"><FontAwesomeIcon icon={faUser} /></span>
                <span>Account</span>{auth.token && auth.user.isSuperAdmin===true?"":<span className="admin__sidebar-restricted">🚫</span>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="admin__sidebar-card">
            {/*<img src={pic} alt="" className="admin__pic"/>
            */}<div className="admin__side-card-icon">
              <span className="admin__lab admin__la-codiepie"><FontAwesomeIcon icon={faCog} /></span>
            </div>
            <div>
              <h4>Make AdSense</h4>
              <p>Add ads to your videos to earn money</p>
            </div>
            <button className="admin__btn admin__btn-main admin__btn-block"> Create Now</button>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar
