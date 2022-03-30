import React from 'react'
import './styles.css'
const Structure = ({logo,setOnStructuralDetail}) => {
  return (
    <main className="admin__main-application">
    <section>
      <button className="admin__structural-back-btn" onClick={()=>setOnStructuralDetail(false)}>Back</button>
      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Research before application</h3>
          <div className="admin__graph-content_apply ">

      <div className="admin__graph-board_apply">

      <div className="admin__app_tree">
          <ul>
              <li><a href=""><img src={logo} alt="imgchild"/><span>child</span></a>
                  <ul>
                      <li><a href=""><img src={logo} alt="imggrandchild"/><span>Grand Child</span></a>
                        <ul>
                          <li><a href=""><img src={logo} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                          <li><a href=""><img src={logo} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                        </ul>
                      </li>
                      <li><a href=""><img src={logo} alt="imggrandchild"/><span>Grand Child</span></a>
                        <ul>
                          <li><a href=""><img src={logo} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                          <li><a href=""><img src={logo} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                          <li><a href=""><img src={logo} alt="imggrandchild"/><span>Great Grand Child</span></a></li>
                        </ul>
                      </li>
                      <li><a href=""><img src={logo} alt="imggrandchild"/><span>Grand Child</span></a></li>
                  </ul>
              </li>
          </ul>
      </div>


      </div>
      </div>
      </div>
    </div>
    </section>


    </main>
  )
}

export default Structure
