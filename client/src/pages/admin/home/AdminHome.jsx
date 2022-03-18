import React,{useEffect} from 'react'
import './AdminHome.css'
import {profile,logo,pic} from '../../../images'
import {AdminSideBar} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faVideo,faEye, faClock,faUsers,faHeart,faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const AdminHome = () => {
  useEffect(()=>{
    const getVisitorsInfo = async()=>{
      const res = await axios.get("/api/welcomeUser")
      console.log(res.data)
    }
    getVisitorsInfo()
  },[])

  return (
    <div className="admin__body">
    <input type="checkbox" name="admin__menu-toggle" id="admin__menu-toggle"/>
    <div className="admin__overlay">
    <label for="admin__menu-toggle">
      </label>
    </div>
    <AdminSideBar img={profile} logo={logo} pic={pic}/>
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Analytics</h1>
          <p>Display analytics about any and everything I engage with. <span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <button className="admin__btn admin__btn-main">
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faSignInAlt} /></span>
              Log In
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
                        <img className="admin__img_rev" src={profile} alt="j" />
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
                    <div className="admin__graph-content">
                      <div className="admin__graph-head">
                        <div className="admin__icons-wrapper">
                            <div className="admin__icon">
                              <span className="admin__las admin__la-eye admin__text-main"><FontAwesomeIcon icon={faEye} /></span>
                            </div>

                            <div className="admin__icon">
                              <span className="admin__las admin__la-eye admin__text-success"><FontAwesomeIcon icon={faClock} /></span>
                            </div>
                        </div>
                        <div className="admin__graph-select">
                          <select name="" id="">
                              <option value="">September</option>
                          </select>
                        </div>
                      </div>
                      <div className="admin__graph-board">
                        <canvas id="admin__revenueChart" width="100%" height="50px">

                        </canvas>
                      </div>
                    </div>
                </div>
              </div>
          </section>
      </main>
    </div>

    </div>
  )
}

export default AdminHome
