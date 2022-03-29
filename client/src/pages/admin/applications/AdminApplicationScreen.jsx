import React from 'react'
import './AdminApplicationScreen.css'

import {AdminSideBar, AdminExpenseDetails, AdminExpenseMain} from '../../../components'
import {profile,logo,pic} from '../../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {Grid} from '@material-ui/core'
import useStyles from './styles'



const AdminApplicationScreen = () => {
    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const classes = useStyles()
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
    activeLink3="admin__active"
    fullname={auth.user.fullname }
    username={auth.user.username}
    />
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Welcome To Applications Tracking</h1>
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

      <main className="admin__main-application">
      <section>
        <div className="admin__block-grid3">
        <div className="admin__graph-card admin__Irishhis-container">
            <h3 className="admin__section-head">Research before application</h3>
            <div className="admin__graph-content_apply ">

        <div className="admin__graph-board_apply">

        <div className="admin__app_tree">
            <ul>
                <li><a href=""><img src={profile} alt="imgchild"/><span>child</span></a>
                    <ul>
                        <li><a href=""><img src={profile} alt="imggrandchild"/><span>Grand Child</span></a>
                          <ul>
                            <li><a href=""><img src={profile} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                            <li><a href=""><img src={profile} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                          </ul>
                        </li>
                        <li><a href=""><img src={profile} alt="imggrandchild"/><span>Grand Child</span></a>
                          <ul>
                            <li><a href=""><img src={profile} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                            <li><a href=""><img src={profile} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                            <li><a href=""><img src={profile} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                          </ul>
                        </li>
                        <li><a href=""><img src={profile} alt="imggrandchild"/><span>Grand Child</span></a></li>
                    </ul>
                </li>
            </ul>
        </div>


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

export default AdminApplicationScreen
