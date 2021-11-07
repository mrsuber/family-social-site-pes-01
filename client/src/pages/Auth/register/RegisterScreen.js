import './RegisterScreen.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {CircularProgress} from "@material-ui/core"
import {register} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const RegisterScreen = ({history}) => {
  const initialState = {username:'',email:'',password:''}
  const[userData,setUserData]= useState(initialState)
  // const [username,setUsername]=useState('')
  // const [email,setEmail]=useState('')
  // const [password,setPassword]=useState('')
  const [confirmpassword,setConfirmpassword]=useState('')
  const [error,setError]=useState('')
  const [isFectching,setIsFectching]=useState(false)
  const {username,email,password} = userData

  const [typePass,setTypePass]=useState(false)

    const dispatch = useDispatch()

    const handleChangeInput = e=>{
      const {name,value} = e.target
      setUserData({...userData,[name]:value})
    }

    const registerHandler = (e)=>{
      e.preventDefault()
      if(password!==confirmpassword){

        setConfirmpassword("")
        setTimeout(()=>{
          setError("")
        },5000)
        return setError("Password do not match")
      }
      dispatch(register(userData))
    }

  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      history.push("/")
    }
  },[history])

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
      <h3 className="register-screen_title">Register</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="register-form-group">
        <label htmlFor="name">Username:</label>
        <input type="text" required id="name" placeholder="Enter Username" value={username} onChange={handleChangeInput} name="username"/>
      </div>

      <div className="register-form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" required id="email" placeholder="Enter email" value={email} onChange={handleChangeInput} name="email"/>
      </div>

      <div className="register-form-group">
        <label htmlFor="password">Password:</label>
        <input type={typePass? "text":"password"} required id="password" placeholder="Enter Password" value={password} onChange={handleChangeInput} name="password"/>
        <small onClick={()=>setTypePass(!typePass)}>
        {typePass? 'Hide':'Show'}
        </small>
      </div>

      <div className="register-form-group">
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input type={typePass? "text":"password"} required id="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={(e) =>setConfirmpassword(e.target.value)}/>
        <small onClick={()=>setTypePass(!typePass)}>
        {typePass? 'Hide':'Show'}
        </small>
      </div>
      <button type="submit" className="btn btn-primary"disabled={isFectching}>{isFectching ? <CircularProgress color="white" size="20px"/> : "Register"}</button>

      <span className="register-screen_subtext">Already have an account? <Link to="/login">Login</Link></span>
    </form>



    </div>
  )
}

export default RegisterScreen
