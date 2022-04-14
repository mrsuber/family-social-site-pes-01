import React,{useState,useEffect} from 'react'
import './AdminLoginScreen.css'
import {AdminSideBar,AdminToast} from '../../../components'
import {profile,logo,pic} from '../../../images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome} from '@fortawesome/free-solid-svg-icons';

import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {login} from '../../../redux/actions/authAction'
import {Link} from 'react-router-dom'

const AdminLoginScreen = () => {
  const {auth} = useSelector(state => state)
  const history = useHistory()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [reload,setReload] = useState(false)
  // const initialState = {email:email,password:password}
  // const[userData,setUserData]= useState(initialState)
  const [isFectching,setIsFectching]=useState(false)
  // const {email,password} = userData



  const [typePass,setTypePass]=useState(false)

  const dispatch = useDispatch()

  // const handleChangeInput = e=>{
  //   const {name,value} = e.target
  //   setUserData({...userData,[name]:value})
  // }

    const loginHandler= (e)=>{
      e.preventDefault()
      setIsFectching(true)
      dispatch(login({email,password}))
      setIsFectching(false)


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
    <AdminSideBar img={profile} logo={logo} pic={pic}/>
    <div className="admin__main-content">
      <header className="admin__header">
        <div className="admin__header-title-wrapper">
          <label for="admin__menu-toggle">
            <span className="admin__las admin_la-bars"><FontAwesomeIcon icon={faBars} /></span>
          </label>
          <div className="admin__header-title">
          <h1>Admin Login</h1>
          <p>This is Demo Account. To see real data, please login.. <span className="admin__las admin__la-chart-line"><FontAwesomeIcon icon={faChartLine} /></span></p>
          </div>
        </div>
        <div className="admin__header-action">
          <Link to="/admin" className="admin__btn admin__btn-main " style={{textDecoration: "none",color: "inherit"}}>
              <span className="admin__las admin__la-video"><FontAwesomeIcon icon={faHome} /></span>
              Home
          </Link>
        </div>
      </header>

      <main className="admin__main-login">
      <div className="admin__login-container">
          <div className="admin__login-box">
            <form onSubmit={loginHandler} >
              <div class="user-box">
                  <input type="text" name="" required=""  value={email} onChange={(e) =>setEmail(e.target.value)} tabIndex={1}/>
                  <label>Email</label>
              </div>
              <div class="user-box">
                <input type="password" name="" required="" value={password} onChange={(e) =>setPassword(e.target.value)} tabIndex={2} />
                <label>Password</label>
              </div>
              <button type="submit" className="submit-btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
          </form>
        </div>
    </div>


      </main>
    </div>

    </div>
  )
}

export default AdminLoginScreen
