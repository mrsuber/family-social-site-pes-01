import React,{useEffect,useState} from 'react'
import './styles.css'
const Structure = ({companyName,cardData,strutureData,setOnStructuralDetail}) => {

    const[filteredCardData, setfilteredCardData] = useState([])
    const[filteredStructuralData,setFilteredStructuralData] = useState([])

  useEffect(()=>{
    const data = (cardData)=>{

      for(let i=0;i<cardData.length; i++){
        if(cardData[i].companyName === companyName){
          setfilteredCardData(cardData[i])
          return

        }
      }
      return
    }

    const data2 = (data)=>{

      for(let i=0;i<data.length; i++){
        if(data[i].companyName === companyName){
          setFilteredStructuralData(data[i])
          return

        }
      }
      return
    }
    data2(strutureData)
    data(cardData)
  },[])





  return (
    <main className="admin__main-application">
    <section>
      <button className="admin__structural-back-btn" onClick={()=>setOnStructuralDetail(false)}>Back</button>
      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Research before application</h3>
          <div className="admin__graph-content_apply ">

      <div className="admin__graph-board_apply">
data
      <div className="admin__app_tree">
          <ul>
              <li ><a href="" className="AdminStructure__a-first">
                        <div className="AdminStructure__company-logo">
                          <img src={filteredCardData.logo} alt="imgchild"/>
                        </div>

                        <div className="AdminStructure__company-mainItem">
                          <h3>Name: <span>{filteredCardData.companyName}</span></h3>
                          <h3>Location: <span>{filteredStructuralData.companyHeadOfficeLocation}</span></h3>

                        </div>
                        <span className="AdminStructure__hoverSpan">more...</span>

                  </a>

                  <ul>
                    {
                      filteredStructuralData.companyLevel1.map(()=>(
                        <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Grand Child in loop</span></a>
                          <ul>
                            <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child loop</span></a></li>
                            <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child loop</span></a></li>
                          </ul>
                        </li>
                      ))
                    }
                      <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Grand Child</span></a>
                        <ul>
                          <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child</span></a></li>
                          <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child</span></a></li>
                        </ul>
                      </li>


                      <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Grand Child</span></a>
                        <ul>
                          <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child</span></a></li>
                          <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child</span></a></li>
                          <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Great Grand Child</span></a></li>
                        </ul>
                      </li>


                      <li><a href=""><img src={filteredCardData.logo} alt="imggrandchild"/><span className="AdminStructure__hoverSpan">Grand Child</span></a></li>
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
