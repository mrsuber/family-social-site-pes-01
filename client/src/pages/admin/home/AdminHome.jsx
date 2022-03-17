import React from 'react'
import './AdminHome.css'
import {profile,logo,pic} from '../../../images'
import {AdminSideBar} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faVideo,faEye, faClock,faUsers,faHeart} from '@fortawesome/free-solid-svg-icons';


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

      <main className="admin__main">
          <section>
            <h3 className="admin__section-head">Overview</h3>
            <div className="admin__analytics">
                <div className="admin__analytic">
                  <div className="admin__analytic-icon admin__accent-main">
                    <span className="admin__las admin_la-eye"><FontAwesomeIcon icon={faEye} /></span>
                  </div>
                  <div className="admin__analytic-info">
                      <h4>Total views</h4>
                      <h1>10.3M</h1>
                  </div>
                </div>

                <div className="admin__analytic">
                  <div className="admin__analytic-icon">
                    <span className="admin__las admin_la-eye"><FontAwesomeIcon icon={faClock} /></span>
                  </div>
                  <div className="admin__analytic-info">
                      <h4>Watch Times (hrs)</h4>
                      <h1>20.9k <small className="admin__text-danger">5%</small></h1>
                  </div>
                </div>


                <div className="admin__analytic">
                  <div className="admin__analytic-icon">
                    <span className="admin__las admin_la-eye"><FontAwesomeIcon icon={faUsers} /></span>
                  </div>
                  <div className="admin__analytic-info">
                      <h4>Subscribers</h4>
                      <h1>1.3k <small className="admin__text-success">25%</small></h1>
                  </div>
                </div>


                <div className="admin__analytic">
                  <div className="admin__analytic-icon">
                    <span className="admin__las admin_la-eye"><FontAwesomeIcon icon={faHeart} /></span>
                  </div>
                  <div className="admin__analytic-info">
                      <h4>Total likes</h4>
                      <h1>3.4M</h1>
                  </div>
                </div>
            </div>
          </section>

          <section>

              <div className="admin__block-grid">
                <div  className="admin__revenue-card">
                  <h3 className="admin__section-head">Total Revenue</h3>
                    <div className="admin__rev-content">
                        <img src={profile} alt="j" />
                        <div className="admin__rev-info">
                          <h3>Mohamad Siysinyuy</h3>
                          <h1>3.5M <small>Subscribers</small></h1>
                        </div>
                        <div className="admin__rev-sum">
                          <h4>Total income</h4>
                          <h2>$70,859</h2>
                        </div>
                    </div>

                </div>
                <div className="admin__graph-card">
                    <h3 className="admin__section-head">Graph</h3>
                </div>
              </div>
          </section>
      </main>
    </div>

    </div>
  )
}

export default AdminHome
