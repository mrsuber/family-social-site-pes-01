import React from 'react'
import {AdminSideBar} from '../../../components'
import {profile,logo,pic} from '../../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome,faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../../redux/actions/authAction'
import './AdminErrorScreen.css'
const AdminErrorScreen = () => {

  const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

  const logoutnow =()=>{
    dispatch(logout())
  }


  return (
    <div className="admin__body">
    <input type="checkbox" name="admin__menu-toggle" id="admin__menu-toggle"/>
    <div className="admin__overlay">
    <label for="admin__menu-toggle">
      </label>
    </div>
    <AdminSideBar
    img={profile}
    logo={logo}
    pic={pic}
    />
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Error</h1>
          <p>This is Demo Account. To see real data, please login.. <span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <button className="admin__btn admin__btn-main" onClick={()=>{window.location.href = "/admin"}}>
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faHome} /></span>
              Home
          </button>
        </div>
      </header>

      <main className="admin__main-error">
      <div>
      <h1 className="admin__access-denied"><code>Access Denied</code></h1>
      <hr  style={{margin:'auto',width:'50%'}} />
      <h3 >You dont have permission to view this site.</h3>
      <h3>🚫🚫🚫🚫</h3>
      <h6 >error code:403 forbidden</h6>

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



      </main>
    </div>

    </div>
  )
}

export default AdminErrorScreen
