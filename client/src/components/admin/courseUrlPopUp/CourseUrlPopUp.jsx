import React,{useState} from 'react'
import './CourseImagePopUp.css'

const CourseUrlPopUp = ({url,title,index}) => {
  const [imagePopup,setImagePopup]=useState(false)
  return (
    <>
      {/*<span onClick={()=>setImagePopup(true)} className="courseImageReadMorePopUp">visit url more...</span>
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


              <div dangerouslySetInnerHTML={{ __html: `<iframe src=${url} />`}} />

          </div>



          </div>


        </div>
        :<></>
    }
    */}
    <div>
      <a href={url} target="_blank" rel="noreferrer">{`${index+1}.) `}{title}</a>
    </div>
    </>
  )
}

export default CourseUrlPopUp
