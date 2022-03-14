import React from 'react'
import './AdminHome.css'
import {profile} from '../../../images'
import {AdminSideBar} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';


const AdminHome = () => {
  return (
    <div className="admin__body">
    <input type="checkbox" name="" id="menu-toggle"/>

    <AdminSideBar img={profile} />
    <div className="admin__main-content">
      <header>
        <div>
          <label for="">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div>
          <h2>Analytics</h2>
          <p>Display analytics about your Channel <span className="admin__las admin__la-chart-line"></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <button className="admin__btn admin__btn-main">
              <span className="admin__las admin__la-video"></span>
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
