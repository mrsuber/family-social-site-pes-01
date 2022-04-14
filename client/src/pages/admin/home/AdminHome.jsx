import React,{useEffect,useState} from 'react'
import './AdminHome.css'
import {profile,logo,pic} from '../../../images'
import {AdminSideBar,DisplayCssColorsHis,AdminRevenueCard,IrishFlower,GlobalTemp,WorldMap,Migrands,WorldMapMig} from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faEye, faClock,faUsers,faHeart,faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {useCountryData,useCssColorData,useIrisFlowerData,useTempData,useWorldMapData,usePointsOnMapData,useMigrandsData,useMigrandsMissPointsData} from '../../../utils/adminUseData'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'

const AdminHome = () => {

  const countryData = useCountryData();
  const cssColorData = useCssColorData()
  const irishFlowerData = useIrisFlowerData()
  const tempData = useTempData()
  const worldMapData=useWorldMapData()
  const pointsOnMapData= usePointsOnMapData()
  const migrandsData = useMigrandsData()
  const migrandsMissPointsData = useMigrandsMissPointsData()

  const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)

  const logoutnow =()=>{
    dispatch(logout())
  }
  const longinnow = ()=>{
    window.location.href = "/admin/login"
  }

  useEffect(()=>{
    if(auth.token && auth.user.isSuperAdmin===true){
      window.location.href = "/admin/application"
      setReload(!reload)
    }else if(auth.token && auth.user.isAdmin===true){

          window.location.href = "/admin/application/oracle"
          setReload(!reload)
      }else if(auth.token && auth.user.isStudentTech===true){

            window.location.href = "/admin/devcourse/"
            setReload(!reload)
      }

  },[reload])

  return (
    <div className="admin__body">
    <input type="checkbox" name="admin__menu-toggle" id="admin__menu-toggle"/>
    <div className="admin__overlay">
    <label for="admin__menu-toggle">
      </label>
    </div>
    <AdminSideBar img={profile} logo={logo} pic={pic} activeLink="admin__active"/>
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Analytics</h1>
          <p>This is Demo Account. To see real data, please login.. <span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          {auth.token?
            <button className="admin__btn admin__btn-main admin__btn-error" onClick={logoutnow}>
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faSignInAlt} /></span>
            Log Out
          </button>
          :
          <Link to="/admin/login" className="admin__btn admin__btn-main admin__btn-error" style={{textDecoration: "none",color: "inherit"}} >
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faSignInAlt} /></span>
              Log In
          </Link>

        }
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

          <section>
            <div className="admin__block-grid3">
          {worldMapData.length===0 || pointsOnMapData.length===0? 'Loding Data':<WorldMap worldAtlas={worldMapData} cities={pointsOnMapData}/>}
          </div>
          </section>

          <section>
            <div className="admin__block-grid3">
          {worldMapData.length===0 || migrandsMissPointsData.length===0? 'Loding Data':<WorldMapMig worldAtlas={worldMapData} data={migrandsMissPointsData}/>}
          </div>
          </section>

          <section>
            <div className="admin__block-grid3">
          {migrandsData.length===0? 'Loding Data':<Migrands data={migrandsData}/>}
          </div>
          </section>
      </main>
    </div>

    </div>
  )
}

export default AdminHome
