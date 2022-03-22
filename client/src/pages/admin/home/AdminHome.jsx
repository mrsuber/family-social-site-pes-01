import React,{useEffect,useState} from 'react'
import './AdminHome.css'
import {profile,logo,pic} from '../../../images'
import {AdminSideBar,DisplayCssColorsPie,DisplayCssColorsHis,AdminRevenueCard,AdminSalariesVSJobs,IrishFlower,GlobalTemp} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faVideo,faEye, faClock,faUsers,faHeart,faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {useCountryData,useCssColorData,useIrisFlowerData,useTempData} from '../../../utils/adminUseData'




const AdminHome = () => {

  const countryData = useCountryData();
  const cssColorData = useCssColorData()
  const irishFlowerData = useIrisFlowerData()
  const tempData = useTempData()


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
                <AdminRevenueCard profile={profile}/>
                {countryData? <DisplayCssColorsHis data={countryData}/>:'Loding Data'}
              </div>
          </section>
          <section>




          <div className="admin__block-grid2">
          {irishFlowerData? <IrishFlower data={irishFlowerData}/>:'Loding Data'}
          {tempData? <GlobalTemp data={tempData}/>:'Loding Data'}
          </div>
          </section>
      </main>
    </div>

    </div>
  )
}

export default AdminHome
