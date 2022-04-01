import React,{useEffect,useState} from 'react'
import './styles.css'
import {AdminSturcturalPeoplePopUpDetail} from '../../../components'
import {ZoomIn,ZoomOut,Refresh} from '@material-ui/icons';





const Structure = ({companyName,cardData,strutureData,setOnStructuralDetail}) => {

    const[filteredCardData, setfilteredCardData] = useState([])
    const[filteredStructuralData,setFilteredStructuralData] = useState(null)
      const [lenght,setLenth] = useState(50)
      const [onView,setOnView] = useState(false)
      const [people,setPeople] = useState(null)
      const [position,setPosition]= useState(null)

      const [zoom, setZoom]=useState(1)

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

    const filteredStructuralDataCompanyLevel1Lenght =(data)=>{
      if((data && data.companyLevel1.length *30)> lenght ){
        setLenth(data.companyLevel1.length *30)
      }
    }

    const filteredStructuralDataCompanyLevel1PeopleLenght =(data)=>{

      if(data!==null){

        for(let i=0;i<data.companyLevel1.length; i++){

          if((data.companyLevel1[i].people.length*30)>lenght){
            setLenth(data.companyLevel1[i].people.length*30)

          }
        }
      }
    }

    filteredStructuralDataCompanyLevel1Lenght(filteredStructuralData)
    filteredStructuralDataCompanyLevel1PeopleLenght(filteredStructuralData)



    data2(strutureData)
    data(cardData)



  },[companyName,cardData,filteredCardData,filteredStructuralData,strutureData,lenght])


  const displayPopup =(item,data)=>{
    setPeople(item)
    setPosition(data)
    setOnView(true)
  }







  return (
    <main className="admin__main-application">
    <div class="admin__stucture_btn admin__stucture_btn-zoom" onClick={()=>setZoom(zoom+0.1)}>  <ZoomIn /></div>
    <div class="admin__stucture_btn admin__stucture_btn-zoom-out" onClick={()=>setZoom(zoom-0.1)}><ZoomOut/></div>
    <div class="admin__stucture_btn admin__stucture_btn-zoom-init" onClick={()=>setZoom(1)}><Refresh/></div>

    {
      onView===true
      && <AdminSturcturalPeoplePopUpDetail setOnView={setOnView} onView={onView} data={people} position={position} setOnStructuralDetail={setOnStructuralDetail}/>

    }
    <section>
      <button className="admin__structural-back-btn" onClick={()=>setOnStructuralDetail(false)}>Back</button>



      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Research before application.(move around with mouse to find tree)</h3>
          <div className="admin__graph-content_apply " style={{transform: `scale(${zoom})`}}>

      <div className="admin__graph-board_apply" style={{width:`${lenght}rem`}} >


      <div className="admin__app_tree">
          <ul className="ul">
          {/*company name*/}
              <li className="li"><nav className="AdminStructure__a-first" >

                        <div className="AdminStructure__company-logo">
                          <img src={filteredCardData.logo} alt="imgchild"/>
                        </div>

                        <div className="AdminStructure__company-mainItem">
                          <h3>Name: <span>{filteredCardData.companyName}</span></h3>
                          <h3>Location: <span>{  filteredStructuralData && filteredStructuralData.companyHeadOfficeLocation}</span></h3>

                        </div>
                        <span className="AdminStructure__hoverSpan"style={{cursor:'pointer'}} >more...</span>

                  </nav>

                  {filteredStructuralData &&<ul className="ul">
                  {/*EXECUTIVE and bourd of directors*/}
                    {
                       filteredStructuralData.companyLevel1.map((data,i)=>(
                        <li key={i} className="li">
                            <nav>

                                <div className="AdminStructure__company-logo">
                                  <img src={filteredCardData.logo} alt="imgchild"/>
                                </div>

                                <div className="AdminStructure__company-mainItem">
                                  <h3>Name: <span>{data.name}</span></h3>

                                </div>
                                <span className="AdminStructure__hoverSpan" style={{cursor:'pointer'}}>more...</span>

                            </nav>
                          {data.people && <ul className="ul">
                          {/*CEO and people of the bourd of dirctor*/}
                          {
                            data.people.map((item,i2)=>(
                              <li key={i2} className="li">


                                <nav>
                                <div className="AdminStructure__company-logo">
                                  <img src={item.photo} alt="imgchild"/>
                                </div>

                                <div className="AdminStructure__company-mainItem">
                                  <h3>Name: <span>{item.name}</span></h3>


                                </div>
                                <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(item,data)} style={{cursor:'pointer'}}>more...</span>
                                </nav>
                                    {item.report1 && <ul className="ul">
                                    {/*report to the CEO and Bourd of directors*/}

                                      {
                                         item.report1.map((rep1)=>(
                                          <li className="li">
                                          <nav>
                                          <div className="AdminStructure__company-logo">
                                            <img src={rep1.photo} alt="imgchild"/>
                                          </div>

                                          <div className="AdminStructure__company-mainItem">
                                            <h3>Name: <span>{rep1.name}</span></h3>


                                          </div>
                                          <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep1,item)} style={{cursor:'pointer'}}>more...</span>
                                          </nav>
                                          {rep1.report2 && <ul className="ul">
                                          {/*report to the CEO and Bourd of directors*/}

                                            {
                                               rep1.report2.map((rep2)=>(
                                                <li className="li">
                                                <nav>
                                                <div className="AdminStructure__company-logo">
                                                  <img src={rep2.photo} alt="imgchild"/>
                                                </div>

                                                <div className="AdminStructure__company-mainItem">
                                                  <h3>Name: <span>{rep2.name}</span></h3>


                                                </div>
                                                <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep2,rep1)} style={{cursor:'pointer'}}>more...</span>
                                                </nav>

                                                {rep2.report3 && <ul className="ul">
                                                {/*report to the CEO and Bourd of directors*/}

                                                  {
                                                     rep2.report3.map((rep3)=>(
                                                      <li className="li">
                                                      <nav>
                                                      <div className="AdminStructure__company-logo">
                                                        <img src={rep3.photo} alt="imgchild"/>
                                                      </div>

                                                      <div className="AdminStructure__company-mainItem">
                                                        <h3>Name: <span>{rep3.name}</span></h3>


                                                      </div>
                                                      <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep3,rep2)} style={{cursor:'pointer'}}>more...</span>
                                                      </nav>
                                                      </li>
                                                    ))
                                                  }

                                                </ul>}
                                                </li>
                                              ))
                                            }

                                          </ul>}
                                          </li>
                                        ))
                                      }

                                    </ul>}
                                </li>

                            ))
                          }
                            </ul>}
                        </li>
                      ))
                    }
                    </ul>}
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
