import React from 'react'
import './AdminHome.css'
import {profile,logo,pic} from '../../../images'
import {AdminSideBar} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faVideo} from '@fortawesome/free-solid-svg-icons';


const AdminHome = () => {
  return (
    <div className="admin__body">
    <input type="checkbox" name="" id="menu-toggle"/>

    <AdminSideBar img={profile} logo={logo} pic={pic}/>
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Analytics</h1>
          <p>Display analytics about your Channel <span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <button className="admin__btn admin__btn-main">
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faVideo} /></span>
              Upload
          </button>
        </div>
      </header>

      <main>
          
      </main>
    </div>

    </div>
  )
}

export default AdminHome
