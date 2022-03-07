import './LoginScreen.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress} from "@material-ui/core"
import {login} from '../../../redux/actions/authAction'
import {FAMILY_TYPES} from '../../../redux/actions/familyAction'

import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'


const LoginScreen2 = () => {
  const {auth} = useSelector(state => state)
  const history = useHistory()
  const initialState = {email:'',password:''}
  const[userData,setUserData]= useState(initialState)
  const [isFectching,setIsFectching]=useState(false)
  const {email,password} = userData

  const [typePass,setTypePass]=useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = e=>{
    const {name,value} = e.target
    setUserData({...userData,[name]:value})
  }


  const loginHandler= (e)=>{
    e.preventDefault()
    setIsFectching(true)
    dispatch(login(userData))
    setIsFectching(false)
    dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:true})

  }


  useEffect(()=>{
    if(auth.token)window.location.href = "/social_home"

  },[auth.token , history])



  return (
    <>
    <div className="login-screen">
    <div className="login-wrapper">

    <div className="login-form login-screen_form">
    <form onSubmit={loginHandler} >
      <h3 className="login-screen_title" >Login To Geneasocial</h3>

      <div className="login-form-group">
        <label htmlFor="email">Email:</label>
        <input  type="email" required id="email" placeholder="Enter email" value={email} onChange={handleChangeInput} name="email" tabIndex={1}/>
        </div>


        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input type={typePass? "text":"password"} required id="password" placeholder="Enter Password" value={password} onChange={handleChangeInput} name="password"/>
          <small onClick={()=>setTypePass(!typePass)}>
          {typePass? 'Hide':'Show'}
          </small>
        </div>


        <button className="btn btn-primary social2_login_btn" type="submit" tabIndex={3} disabled={isFectching}>{isFectching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>

      <span className="login-screen_subtext">forgot your password? <Link to="/forgotpassword">Reset Now</Link></span>
      <span className="login-screen_subtext">Don't have an account? <Link to="/register">Create Now</Link></span>
      <span className="login-screen_subtext pf__portforlio__visit">Visit my Portfolio site? <a href = '/porfolio/home' target="__blank">Clik Now</a></span>

    </form>
    </div>
    <a href = '/porfolio/home' target="__blank" className="social2__link pf__portforlio__visit2">
    <div className="animation_container">
    <div className="login-other-boxes">
    <a href = '/porfolio/home'  target="__blank" className="social2__link">

    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <p>View Portfolio</p>
    </a>
    </div>
    </div>
      </a>

    </div>


    </div>

    </>
  )
}

export default LoginScreen2
