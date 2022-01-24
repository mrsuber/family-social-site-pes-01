import './RegisterScreen.css'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress} from "@material-ui/core"
import {register} from '../../../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'


const RegisterScreen = () => {
  const {auth,alert} = useSelector(state=>state)
  const history = useHistory()
  const initialState = {fullname:'',username:'',email:'',password:'',cf_password:''}
  const[userData,setUserData]= useState(initialState)

  // const [confirmpassword,setConfirmpassword]=useState('')
  // const [error,setError]=useState('')
  const [isFectching,setIsFectching]=useState(false)
  const {fullname,username,email,password,cf_password} = userData

  const [typePass,setTypePass]=useState(false)
  const [typeCfPass,setTypeCfPass]=useState(false)
    const dispatch = useDispatch()

    const handleChangeInput = e=>{
      const {name,value} = e.target
      setUserData({...userData,[name]:value})
    }

    const registerHandler = (e)=>{
      e.preventDefault()
      // if(password!==confirmpassword){
      //
      //   setConfirmpassword("")
      //   setTimeout(()=>{
      //     setError("")
      //   },5000)
      //   return setError("Password do not match")
      // }
      setIsFectching(true)
      dispatch(register(userData))
      setIsFectching(false)
    }

  useEffect(()=>{
    // if(localStorage.getItem("authToken")){
    //   history.push("/")
    // }
    if(auth.token) history.push("/")
  },[auth.token,history])

  // const registerHandler= async (e)=>{
  //   e.preventDefault()
  //   const config = {
  //     header:{
  //       "Content-Type":"application/json"
  //     }
  //   }
  //   if(password!==confirmpassword){
  //     setPassword("")
  //     setConfirmpassword("")
  //     setTimeout(()=>{
  //       setError("")
  //     },5000)
  //     return setError("Password do not match")
  //   }
  //
  //   try{
  //      const {data}= await axios.post("/api/auth/register",{username,email,password},config);
  //      localStorage.setItem("authToken",data.token)
  //      history.push("/")
  //   }catch(error){
  //     setError(error.response.data.msg)
  //       setTimeout(()=>{
  //         setError("")
  //       },5000)
  //   }
  // }
  return (
    <div className="register-screen">

    <form onSubmit={registerHandler} className="register-screen_form">
      <h3 className="register-screen_title">Register To Geneasocial</h3>
      {/*error && <span className="error-message">{error}</span>*/}

      <div className="register-form-group">
        <label htmlFor="fullname">Full Name:</label>
        <input type="text" required id="fullname" placeholder="Enter Fullname" value={fullname} onChange={handleChangeInput} name="fullname"
        style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}}/>
        <small className="register-screen-small-text social2DangerTextColor">{alert.fullname? alert.fullname :''}</small>

      </div>

      <div className="register-form-group">
        <label htmlFor="name">Username:</label>
        <input type="text" required id="name" placeholder="Enter Username" value={username.toLowerCase().replace(/ /g, "")} onChange={handleChangeInput} name="username"
        style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}/>
        <small className="register-screen-small-text social2DangerTextColor">{alert.username? alert.username :''}</small>
      </div>

      <div className="register-form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" required id="email" placeholder="Enter email" value={email} onChange={handleChangeInput} name="email"
        style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}/>
        <small className="register-screen-small-text social2DangerTextColor">{alert.email? alert.email :''}</small>

      </div>

      <div className="register-form-group">
        <label htmlFor="password">Password:</label>
        <input type={typePass? "text":"password"} required id="password" placeholder="Enter Password" value={password} onChange={handleChangeInput} name="password"
          style={{background: `${alert.password ? '#fd2d6a14' : ''}`}}/>
        <small onClick={()=>setTypePass(!typePass)}>
        {typePass? 'Hide':'Show'}
        </small>
        <small className="register-screen-small-text social2DangerTextColor">{alert.password? alert.password :''}</small>

      </div>

      <div className="register-form-group">
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input type={typeCfPass? "text":"password"} required id="cf_password" placeholder="Confirm Password" value={cf_password} onChange={handleChangeInput} name="cf_password"
          style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}}/>
        <small onClick={()=>setTypeCfPass(!typeCfPass)}>
        {typeCfPass? 'Hide':'Show'}
        </small>
        <small className="register-screen-small-text social2DangerTextColor">{alert.cf_password? alert.cf_password :''}</small>

      </div>
      <button type="submit" className="btn btn-primary"disabled={isFectching}>{isFectching ? <CircularProgress color="white" size="20px"/> : "Register"}</button>

      <span className="register-screen_subtext">Already have an account? <Link to="/login">Login</Link></span>
    </form>



    </div>
  )
}

export default RegisterScreen
