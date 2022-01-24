import './LoginScreen.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress} from "@material-ui/core"
import {login} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const LoginScreen = ({history}) => {
  const initialState = {email:'',password:''}
  const[userData,setUserData]= useState(initialState)
  // const [email,setEmail]=useState('')
  // const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [isFectching,setIsFectching]=useState(false)
  const {email,password} = userData

  const [typePass,setTypePass]=useState(false)

  const dispatch = useDispatch()

  const handleChangeInput = e=>{
    const {name,value} = e.target
    setUserData({...userData,[name]:value})
  }
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      history.push("/")
    }
  },[history])


  const loginHandler= (e)=>{
    e.preventDefault()
    dispatch(login(userData))
  }





  return (
    <>
    <div className="login-screen">
    <div className="login-wrapper">

    <div className="login-form login-screen_form">
    <form onSubmit={loginHandler} >
      <h3 className="login-screen_title" >Login Now</h3>
      {error && <span className="error-message">{error}</span>}



      <div className="login-form-group">
        <label htmlFor="email">Email:</label>
        <input  type="email" required id="email" placeholder="Enter email" defaultValue={email} onChange={handleChangeInput} name="email" tabIndex={1}/>
        </div>


        <div className="login-form-group">
          <label htmlFor="password">Password:</label>
          <input type={typePass? "text":"password"} required id="password" placeholder="Enter Password" defaultValue={password} onChange={handleChangeInput} name="password"/>
          <small onClick={()=>setTypePass(!typePass)}>
          {typePass? 'Hide':'Show'}
          </small>
        </div>


        <button className="btn btn-primary" type="submit" tabIndex={3} disabled={isFectching}>{isFectching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>

      <span className="login-screen_subtext">forgot your password? <Link to="/forgotpassword">Reset Now</Link></span>
      <span className="login-screen_subtext">Don't have an account? <Link to="/register">Create Now</Link></span>

    </form>
    </div>

    <div className="login-other-boxes">
    <div className="login-box1"></div>
    <div className="login-box1"></div>
    <div className="login-box1"></div>
    </div>
    </div>


    </div>

    </>
  )
}

export default LoginScreen
