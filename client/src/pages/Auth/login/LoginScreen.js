import './LoginScreen.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {CircularProgress} from "@material-ui/core"

const LoginScreen = ({history}) => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [isFectching,setIsFectching]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      history.push("/")
    }
  },[history])



  const loginHandler= async (e)=>{
    e.preventDefault()
    const config = {
      header:{
        "Content-Type":"application/json"
      }
    }


    try{
       const {data}= await axios.post("/api/auth/login",{email,password},config);
       localStorage.setItem("authToken",data.token)
       history.push("/")
    }catch(error){
      setError(error.response.data.error)
        setTimeout(()=>{
          setError("")
        },5000)
    }
  }





  return (
    <>
    <div className="login-screen">
    <div className="login-wrapper">

    <div className="login-form login-screen_form">
    <form onSubmit={loginHandler} >
      <h3 className="login-screen_title" >Login Now</h3>
      {error && <span className="error-message">{error}</span>}



      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input  type="email" required id="email" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} tabIndex={1}/>
        </div>


        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" required id="password" placeholder="Enter Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
        </div>
        <button className="btn btn-primary" type="submit" tabIndex={3} disabled={isFectching}>{isFectching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>

      <span className="login-screen_subtext">forgot your password? <Link to="/forgotpassword">Reset Now</Link></span>
      <span className="login-screen_subtext">Don't have an account? <Link to="/register">Create Now</Link></span>

    </form>
    </div>

    <div className="login-other-boxes">
    <div className="login-box1"></div>
    <div className="login-box2"></div>
    <div className="login-box3"></div>
    </div>
    </div>


    </div>

    </>
  )
}

export default LoginScreen
