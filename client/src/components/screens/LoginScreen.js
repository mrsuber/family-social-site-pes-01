import './LoginScreen.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import dashbourd from './dashboard.png'
import SecondaryButton from '../buttons/SecondaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import EcomShoppingCard from '../cards/ecomshoppingcard/EcomShoppingCard'
// import PrimaryButton from "../buttons/PrimaryButton"
import {
  faShoppingBasket,
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faTrash,
  faDatabase


 } from '@fortawesome/free-solid-svg-icons';



const LoginScreen = ({history}) => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [isScrolled,setIsScrolled]=useState(true)
  window.onscroll =()=>{
    setIsScrolled(window.pageYOffset===0?false:true)
    return ()=>(window.onscroll=null);
  }
  console.log(window.pageYOffset)

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
    <div className="register-screen">
    <form onSubmit={loginHandler} className="register-screen_form">
      <h3 className="register-screen_title" >Login Now</h3>
      {error && <span className="error-message">{error}</span>}



      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input  type="email" required id="email" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} tabIndex={1}/>
        </div>


        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" required id="password" placeholder="Enter Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
        </div>
      
      <button type="submit" className="btn btn-primary" tabIndex={3}>Login</button>
      <span className="register-screen_subtext">forgot your password? <Link to="/forgotpassword">Reset Now</Link></span>
      <span className="register-screen_subtext">Don't have an account? <Link to="/register">Create Now</Link></span>

    </form>
    </div>

    </>
  )
}

export default LoginScreen
