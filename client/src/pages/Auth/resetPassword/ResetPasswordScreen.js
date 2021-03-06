import './ResetPasswordScreen.css'
import{useState} from 'react'
import{Link} from "react-router-dom"
import axios from "axios"

const ResetPasswordScreen = ({match}) => {
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("");

  const resetPasswordHandler = async (e)=>{
  e.preventDefault()

  const config ={
    header:{
      "Content-Type":"application/json",
    },
  }

  if(password!==confirmpassword){
    setPassword("")
    setConfirmpassword("")
    setTimeout(()=>{
      setError("")
    },5000)
    return setError("Passwords don't match")
  }
  try{
    const {data} = await axios.put(`/api/auth/resetpassword/${match.params.resetToken}`,{password,},config)

    setSuccess(data.data)
  }catch(error){
    setError(error.response.data.msg)
    setTimeout(()=>{
      setError("")
    },5000)
  }

  }

  return (
    <div className="resetpassword-screen">
      <form onSubmit={resetPasswordHandler} className="resetpassword-screen_form">
        <h3 className="resetpassword-screen_title">Reset Password</h3>
        {error &&<span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}<Link to="/login">Login</Link></span>}
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" required id="password" placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password</label>
          <input type="password" required id="confirmpassword" placeholder="Confirm new password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">Reset Password</button>
          <span className="register-screen_subtext">Already have an account? <Link to="/login">Login</Link></span>
      </form>


    </div>
  )
}

export default ResetPasswordScreen
