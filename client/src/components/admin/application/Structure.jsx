import React,{useEffect,useState} from 'react'
import './styles.css'
import {AdminSturcturalPeoplePopUpDetail,AdminResume} from '../../../components'
import {ZoomIn,ZoomOut,Refresh} from '@material-ui/icons';





const Structure = ({companyName,cardData,strutureData,setOnStructuralDetail}) => {

    const[filteredCardData, setfilteredCardData] = useState([])
    const[filteredStructuralData,setFilteredStructuralData] = useState(null)
      const [lenght,setLenth] = useState(50)
      const [onView,setOnView] = useState(false)
      const [people,setPeople] = useState(null)
      const [position,setPosition]= useState(null)
      const [sickleaveViewPopUp,setSickleaveViewPopUp] = useState(false)

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
      if((data && data.companyLevel1.length *80)> lenght ){
        setLenth(data.companyLevel1.length *80)
      }
    }

    const filteredStructuralDataCompanyLevel1PeopleLenght =(data)=>{

      if(data!==null){

        for(let i=0;i<data.companyLevel1.length; i++){

          if((data.companyLevel1[i].people.length*80)>lenght){
            setLenth(data.companyLevel1[i].people.length*80)

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



const runstyle =(data)=>{
  if(data.layoff) return { backgroundColor: "red"}
  if(data.transfered) return { backgroundColor: "#46461b"}
  if(data.uknownPerson) return { backgroundColor: "#78057b"}
  if(data.warning) return { backgroundColor: "#d1ce00"}
  if(data.intern)return{backgroundColor: "white"}
  return {
    
    }
}



  return (
    <main className="admin__main-application">
    <div class="admin__stucture_btn admin__stucture_btn-zoom" onClick={()=>setZoom(zoom+0.1)}>  <ZoomIn /></div>
    <div class="admin__stucture_btn admin__stucture_btn-zoom-out" onClick={()=>setZoom(zoom-0.1)}><ZoomOut/></div>
    <div class="admin__stucture_btn admin__stucture_btn-zoom-init" onClick={()=>setZoom(1)}><Refresh/></div>
    <div className='admin_stucture_statistics'>
      <div className='admin_stucture_statistics_container'>
       
        <p>All Workers No: <span className='admin_stucture_statistics_span'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container'>
        <p>CM Workers No: <span className='admin_stucture_statistics_span'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container'>
        <p>Projects No: <span className='admin_stucture_statistics_span'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container'>
        <p className='admin_stucture_statistics_para' onClick={()=>setSickleaveViewPopUp(true)}>Sick leaves No: <span className='admin_stucture_statistics_span'>02</span></p>
      </div>
      <div className='admin_stucture_statistics_container'>
        <p>Payed leaves No: <span className='admin_stucture_statistics_span'>??</span></p>
      </div>
      
    </div>
    {sickleaveViewPopUp===true && 
    
    <div className='admin_stucture_statistics2'>
      <button className="admin__structural-back-btn2 " onClick={()=>setSickleaveViewPopUp(false)}>close</button>
    <div className='admin_stucture_statistics_container'>
     
      <p>1.) Adidjatou Tsedoumo Hawa Dahli <span className='admin_stucture_statistics_span'>01-(2024)</span></p>
    </div>
    <div className='admin_stucture_statistics_container'>
     
     <p>2.) Mafany Tande Myles Bilong <span className='admin_stucture_statistics_span'>01-(2024)</span></p>
   </div>
   <div className='admin_stucture_statistics_container'>
     
     <p>3.) Samuel Tiokeng <span className='admin_stucture_statistics_span'>01-(2024)</span></p>
   </div>
    
  </div>}
    {
      onView===true
      /*&& <AdminResume/>*/
      && <AdminSturcturalPeoplePopUpDetail setOnView={setOnView} onView={onView} data={people} position={position} setOnStructuralDetail={setOnStructuralDetail}/>

    }
    <section>
      <button className="admin__structural-back-btn" onClick={()=>setOnStructuralDetail(false)}>Back</button>



      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Research before application.(move around with mouse to find tree)</h3>
          <div className="admin__graph-content_apply " style={{transform: `scale(${zoom})`}}>

      <div className="admin__graph-board_apply" style={{width:`${lenght+1000}rem`, backgroundColor:'#1364884f'}} >


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
                                          <nav style={ runstyle(rep1)}>
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
                                                <nav style={ runstyle(rep2)}>
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
                                                      <nav style={ runstyle(rep3)}>
                                                      <div className="AdminStructure__company-logo">
                                                        <img src={rep3.photo} alt="imgchild"/>
                                                      </div>

                                                      <div className="AdminStructure__company-mainItem">
                                                        <h3>Name: <span>{rep3.name}</span></h3>


                                                      </div>
                                                      <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep3,rep2)} style={{cursor:'pointer'}}>more...</span>
                                                      </nav>
                                                      
                                                         {rep3.report4 && <ul className="ul">
                                                         {/*report to the CEO and Bourd of directors*/}
         
                                                           {
                                                              rep3.report4.map((rep4)=>(
                                                               <li className="li">
                                                               <nav style={ runstyle(rep4)}>
                                                               <div className="AdminStructure__company-logo">
                                                                 <img src={rep4.photo} alt="imgchild"/>
                                                               </div>
         
                                                               <div className="AdminStructure__company-mainItem">
                                                                 <h3>Name: <span>{rep4.name}</span></h3>
         
         
                                                               </div>
                                                               <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep4,rep3)} style={{cursor:'pointer'}}>more...</span>
                                                               </nav>
                                                               {rep4.report5 && <ul className="ul">
                                                         {/*report to the CEO and Bourd of directors*/}
         
                                                           {
                                                              rep4.report5.map((rep5)=>(
                                                               <li className="li">
                                                               <nav style={ runstyle(rep5)}>
                                                               <div className="AdminStructure__company-logo">
                                                                 <img src={rep5.photo} alt="imgchild"/>
                                                               </div>
         
                                                               <div className="AdminStructure__company-mainItem">
                                                                 <h3>Name: <span>{rep5.name}</span></h3>
         
         
                                                               </div>
                                                               <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep5,rep4)} style={{cursor:'pointer'}}>more...</span>
                                                               </nav>
                                                               {rep5.report6 && <ul className="ul">
                                                         {/*report to the CEO and Bourd of directors*/}
         
                                                           {
                                                              rep5.report6.map((rep6)=>(
                                                               <li className="li">
                                                               <nav style={ runstyle(rep6)}>
                                                               <div className="AdminStructure__company-logo">
                                                                 <img src={rep6.photo} alt="imgchild"/>
                                                               </div>
         
                                                               <div className="AdminStructure__company-mainItem">
                                                                 <h3>Name: <span>{rep6.name}</span></h3>
         
         
                                                               </div>
                                                               <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep6,rep5)} style={{cursor:'pointer'}}>more...</span>
                                                               </nav>
                                                               {rep6.report7 && <ul className="ul">
                                                         {/*report to the CEO and Bourd of directors*/}
         
                                                           {
                                                              rep6.report7.map((rep7)=>(
                                                               <li className="li">
                                                               <nav style={ runstyle(rep7)}>
                                                               <div className="AdminStructure__company-logo">
                                                                 <img src={rep7.photo} alt="imgchild"/>
                                                               </div>
         
                                                               <div className="AdminStructure__company-mainItem">
                                                                 <h3>Name: <span>{rep7.name}</span></h3>
         
         
                                                               </div>
                                                               <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep7,rep6)} style={{cursor:'pointer'}}>more...</span>
                                                               </nav>
                                                              
                                                               {rep7.report8 && <ul className="ul">
                                                         {/*report to the CEO and Bourd of directors*/}
         
                                                           {
                                                              rep7.report8.map((rep8)=>(
                                                               <li className="li">
                                                               <nav style={ runstyle(rep8)}>
                                                               <div className="AdminStructure__company-logo">
                                                                 <img src={rep8.photo} alt="imgchild"/>
                                                               </div>
         
                                                               <div className="AdminStructure__company-mainItem">
                                                                 <h3>Name: <span>{rep8.name}</span></h3>
         
         
                                                               </div>
                                                               <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(rep8,rep7)} style={{cursor:'pointer'}}>more...</span>
                                                               </nav>
                                                               </li>
                                                              ))}</ul>}
                                                              
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
