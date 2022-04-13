import React from 'react'
import './CourseImagePopUp.css'

const CourseImagePopUp = ({img,setImagePopup}) => {
  return (
    <div className="admin__Unclear-container">
      <div className="admin__Unclear-content2">
      <div className="admin__Unclear-btn-container">
      <button className="admin__Unclear-close-btn" onClick={()=>setImagePopup(false)}>
      Okay
      </button>
      </div>

      <div className="admin__profileOnView-item">
          <img src={img} alt="popup"/>
      </div>



      </div>


    </div>
  )
}

export default CourseImagePopUp
