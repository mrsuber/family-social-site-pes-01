import React from 'react'
import './ArchivementPopup.css'
const ArchivementPopup = ({data,setDepPopup,handleArchivementClose}) => {
  console.log(data, "this is data")
  return (
    <div className="admin__Unclear-container-archivement">
      <div className="admin__Unclear-content-archivement">
      <div className="admin__Unclear-btn-container-archivement">
      <button className="admin__Unclear-close-btn-archivement" onClick={handleArchivementClose}>
      Okay
      </button>
      </div>

      <div>
      <h1 class="title">wtree</h1>
<ul class="wtree">
  <li>
    <span>Nivel 1</span>
  </li>
  <li>
    <span>Nivel 1</span>
    <ul>
      <li>
        <span>Nivel 2</span>
        <ul>
          <li><span>Nivel3</span></li>
        </ul>
      </li>
      <li>
        <span>Nivel 2</span>
      </li>
      <li>
        <span>Nivel 2</span>
      </li>
      <li>
        <span>Nivel 2</span>
      </li>
      <li>
        <span>Nivel 2</span>
      </li>
    </ul>
  </li>
  <li>
    <span>Nivel 1</span>
    <ul>
      <li>
        <span>Nivel 2</span>
        <ul>
          <li>
            <span>Nivel 3</span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
  


</div>



      </div>


    </div>
  )
}

export default ArchivementPopup
