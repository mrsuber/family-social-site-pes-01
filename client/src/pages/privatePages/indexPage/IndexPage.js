import {useState,useEffect} from 'react'
import axios from 'axios'
import './IndexPage.css'
import {Link} from 'react-router-dom'

const IndexPage = ({history}) => {
  const [error,setError] =useState("")
  const [privateData,setPrivateData]=useState("");

  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      history.push("/login")
    }
    const fetchPrivateData = async () =>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const {data} = await axios.get("/api/private",config)

        setPrivateData(data.data)

      }catch(error){

        localStorage.removeItem("authToken")
        setError("You are not authorized please login")
      }
    }

    fetchPrivateData()
  },[history])

  const logoutHandler=()=>{
    localStorage.removeItem("authToken")
    history.push("/login")
  }
  return (
    error? <span className="error-message">{error}</span>
    :
    <>
    <input type="checkbox" id="theme" />
    <div className="index-body">
      <div style={{background:"green", color:"white"}}>PrivateData:{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>

      <div className="index-wrapper">
          <Link to="/home" className="social2__link"><div className="index-box1">
          <h1 className="index-box1_title">MSB-Social</h1>
        </div></Link>

      <div className="index-box1"></div>
        <div className="index-box1"></div>
        <div className="index-box1"></div>
      </div>

      </div>
    </>

  )
}

export default IndexPage
