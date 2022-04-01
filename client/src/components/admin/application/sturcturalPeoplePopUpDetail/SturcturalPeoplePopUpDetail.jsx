import React from 'react'
import {AdminSources} from '../../../../components'
import './SturcturalPeoplePopUpDetail.css'

const SturcturalPeoplePopUpDetail = ({setOnView,onView=false, data,position}) => {
        console.log(position)

        const structural = ()=>{
          setOnView(false)

        }

  return (
    <>{
      onView===false
      ? <></>
      : <>
      <div className="admin__profileOnveiw-container" style={{background:'#2d88ee08'}}>
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
          <img src={data.photo} alt="profilePic"/>

        </div>
        <div className="admin__profileOnView-item">
          <h3 style={{textAlign:'center'}}> {position.name}</h3>
          <h3> Name:<span>{data.name}</span></h3>
          <h3> title:<span>{data.title}</span></h3>
        </div>

        <div className="admin__profileOnView-item">
          <h3>{`Biography `}:</h3>
          <p>{data.Biography}</p>
          <AdminSources source={data.source} name="about " id="s1"/>

        </div>








        <button className="admin__profileOnView-sturctur-btn" onClick={()=>setOnView(false)}>
          <h4>Back</h4>

        </button>
      </div>


      </div>
      </>
    }</>

  )
}

export default SturcturalPeoplePopUpDetail
