import React from 'react'
import './AdminExpenseScreen.css'

import {AdminSideBar, AdminExpenseDetails, AdminExpenseMain} from '../../../components'
import {profile,logo,pic} from '../../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {Grid} from '@material-ui/core'
import useStyles from './styles'



const AdminExpenseScreen = () => {
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
    activeLink5="admin__active"
    fullname={auth.user.fullname ? auth.user.fullname:'Mohamad Demo'}
    username={auth.user.username ?`Welcome ${auth.user.username}` :`Welcom to Demo Account`}
    />
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Welcome To Expenses Analytics</h1>
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

      <main className="admin__main-expense">
          <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:'100vh '}}>
            <Grid item xs={12} sm={4}>
              <AdminExpenseDetails title="Income"/>
            </Grid>

            <Grid item xs={12} sm={3} style={{marginLeft:'10px',marginRight:'10px'}}>
              <AdminExpenseMain/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <AdminExpenseDetails title="Expense" />
            </Grid>
          </Grid>

      </main>
    </div>

    </div>
  )
}

export default AdminExpenseScreen
