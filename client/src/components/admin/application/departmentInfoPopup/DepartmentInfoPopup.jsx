import React from 'react'

const DepartmentInfoPopup = ({data,setDepPopup}) => {
  return (
    <div className="admin__Unclear-container">
      <div className="admin__Unclear-content">
      <div className="admin__Unclear-btn-container">
      <button className="admin__Unclear-close-btn" onClick={()=>setDepPopup(false)}>
      Okay
      </button>
      </div>

      <div className="admin__profileOnView-item">
        <h3 style={{textAlign:'center'}}>{data.title ? data.title:''} </h3>
        <h3> Role:<span>{data.role ? data.role :''}</span></h3>
      </div>

      <div className="admin__profileOnView-item">
        <h3>{`Details Explaining `}:</h3>
        <p>{data.details1 ? data.details1 :''}</p>
        <p>{data.details2 ? data.details2 :''}</p>
        <p>{data.details3 ? data.details3 :''}</p>
        <p>{data.details4 ? data.details4 :''}</p>
        <p>{data.details5 ? data.details5 :''}</p>
        {/*<AdminSources source={data.source} name="about " id="s1"/>*/}

      </div>


      </div>


    </div>
  )
}

export default DepartmentInfoPopup
