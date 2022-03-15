import React from 'react'
import './AdminSideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar,faCog,faUser,faArrowDown,faAdjust,faVideo,faChartBar} from '@fortawesome/free-solid-svg-icons';



const AdminSideBar = ({img,logo,pic}) => {
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
              <h4>Mohamad Siysinyuy</h4>
              <small>Demo Account</small>
            </div>
            <span className="admin__las admin__la-arrow-down"><FontAwesomeIcon icon={faArrowDown} /></span>

          </div>
        </div>
        <div className="admin__sidebar-menu">
          <ul>
            <li>
              <a href="" className="admin__active">
                <span className="admin__las admin__la-adjust"><FontAwesomeIcon icon={faAdjust} /></span>
                <span>Dashboard</span>
              </a>
            </li>

            <li>
              <a href="" >
                <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faVideo} /></span>
                <span>Videos</span>
              </a>
            </li>

            <li>
              <a href="" >
                <span className="admin__las admin__la-chart-bar"><FontAwesomeIcon icon={faChartBar} /></span>
                <span>Analytics</span>
              </a>
            </li>

            <li>
              <a href="">
                <span className="admin__las admin__la-calendar"><FontAwesomeIcon icon={faCalendar} /></span>
                <span>Schedule</span>
              </a>
            </li>

            <li>
              <a href="">
                <span className="admin__las admin__la-user"><FontAwesomeIcon icon={faUser} /></span>
                <span>Account</span>
              </a>
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
