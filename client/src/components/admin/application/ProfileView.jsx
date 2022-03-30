import React,{useState,useEffect} from 'react'
import './profileView.css'
import {useSelector , useDispatch} from 'react-redux'
import {CameraAlt} from '@material-ui/icons'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {checkImage} from '../../../utils/imageUpload'

const ProfileEdit = ({setOnView,onView=false, logo, setOnStructuralDetail}) => {


      const structural = ()=>{
        setOnView(false)
        setOnStructuralDetail(true)
      }

  return (
    <>{
      onView===false
      ? <></>
      : <>
      <div className="admin__profileOnveiw-container">
      <div className="admin__profileOnView-btn-container">
      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView(false)}>
      Close
      </button>

      <button className="admin__profileOnveiw-close-btn" onClick={()=>setOnView(false)}>
      Edit
      </button>
      </div>


      <div className="admin__profileOnveiw-content">
        <div className="admin__profileOnveiw-avatar">
          <img src={logo} alt="profilePic"/>

        </div>
        <div className="admin__profileOnView-item">
          <h3> Name:<span>Google</span></h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>About Google:</h3>
          <p>
Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include a search engine, online advertising technologies, cloud computing, software, and hardware. It has been referred to as the "most powerful company in the world" and one of the world's most valuable brands due to its market dominance, data collection, and technological advantages in the area of artificial intelligence. It is considered one of the Big Five American information technology companies, alongside Amazon, Apple, Meta and Microsoft.</p>
          <small>source: <a href="https://en.wikipedia.org/wiki/Google" target="__blank">wikipedia</a></small>
        </div>

        <div className="admin__profileOnView-item">
          <h3>Full-time Employee:</h3>
          <p>2020:<span>135,301</span></p>
          <p>2021:<span>156,500</span></p>
          <small>source: <a href="https://www.statista.com/statistics/273744/number-of-full-time-google-employees/" target="__blank">statista.com</a></small>
        </div>

        <div className="admin__profileOnView-item">
          <h3>Revenue in million U.S. dollars</h3>
          <p>2020:<span>181.69</span></p>
          <p>2021:<span>256.74</span></p>
          <small>source: <a href="https://www.statista.com/statistics/266206/googles-annual-global-revenue/" target="__blank">statista.com</a></small>
        </div>

        <div className="admin__profileOnView-item">
          <h3>Departments/Teams/Jobs</h3>
          <p>1.) Engineering & Technology</p>
          <p>2.) Sales, Service & Support</p>
          <p>3.) Marketing & Communications</p>
          <p>4.) Design</p>
          <p>5.) Business Strategy</p>
          <p>6.) Finance</p>
          <p>7.) Legal</p>
          <p>8.) People</p>
          <p>9.) Facilities</p>
          <small>source: <a href="https://careers.google.com/teams/" target="__blank">careers.google.com</a></small>
        </div>

        <button className="admin__profileOnView-sturctur-btn" onClick={structural}>
          <h4>Structural Details</h4>

        </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default ProfileEdit
