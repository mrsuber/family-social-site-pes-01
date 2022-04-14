import React,{useState} from 'react'
import './CourseImagePopUp.css'

const CourseImagePopUp = ({img}) => {
  const [imagePopup,setImagePopup]=useState(false)
  return (
    <>
    <span onClick={()=>setImagePopup(true)} className="courseImageReadMorePopUp">Read more...</span>
    {
      imagePopup
      ?  <div className="admin__Unclear-container">
          <div className="admin__Unclear-content2">
          <div className="admin__Unclear-btn-container">
          <button className="admin__Unclear-close-btn" onClick={()=>setImagePopup(false)}>
          Okay
          </button>
          </div>

          <div className="admin__profileOnView-item">
              {/*<img src={img} alt="popup"/>*/}
              <embed
                src={img}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="400px"
                width="100%"
                ></embed>
          </div>



          </div>


        </div>
        :<></>
    }

    </>
  )
}

export default CourseImagePopUp
