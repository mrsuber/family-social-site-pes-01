import React,{useEffect,useState} from 'react'

import {AdminSturcturalCoursePopUpDetail,AdminResume, AdminSturcturalPeoplePopUpDetail, AdminSturcturalRelCoursePopUpDetail} from '../../../components'
import {ZoomIn,ZoomOut,Refresh} from '@material-ui/icons';
import {AdminCourseCard,AdminSideBar,AdminCourseStructureDetails} from '../../../components'
import {profile,logo,pic} from '../../../images'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faChartLine,faHome,faPlus} from '@fortawesome/free-solid-svg-icons';
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../redux/actions/authAction'
import {generalData} from '../../../data/generalData'
import {generalStructuralData} from '../../../data/generalStructuralData'
import Level3 from './Level3'

import './ProjectExpansionMangement.css'
const ProjectExpansionMangementPopup = ({generalSimpledata,setDepPopup,handleManagementClose,SetMainMenuPopUp}) => {
  const[filteredCardData, setfilteredCardData] = useState([])
    const[filteredStructuralData,setFilteredStructuralData] = useState(null)
      const [lenght,setLenth] = useState(50)
      const [onView,setOnView] = useState(false)
      const [people,setPeople] = useState(null)
      const [position,setPosition]= useState(null)
      const [zoom, setZoom]=useState(1)
      const {auth} = useSelector(state=>state)
      const [cardData,setCardData]=useState([])
      const [sturtureData,setSturtureData] = useState([])
      const [courseName, setCourseName]=useState(null)
      const [onStructuralDetail,setOnStructuralDetail] = useState(false)
      const dispatch = useDispatch()
      const [refresh,setRefresh]=useState(false)
      const [onViewPeopleInfo,setonViewPeopleInfo]=useState(false)
      const [onViewDocInfo, setonViewDocInfo]=useState(false)
      const [DocInfo, setDocInfo]=useState([])
      const [PeopleInfo, setPeopleInfo]=useState([])
      useEffect(()=>{
        SetMainMenuPopUp(false)
      })
      useEffect(()=>{
        if(refresh){setCardData(generalData)
        setSturtureData(generalStructuralData)}
        if(!refresh){setCardData(generalData)
        setSturtureData(generalStructuralData)}
      },[refresh])


  useEffect(()=>{
    const data = (cardData)=>{
      for(let i=0;i<cardData.length; i++){
        // console.log(cardData[i].learningTitle, "lets see stuff")
        if(cardData[i].learningTitle === generalSimpledata.title){
          setfilteredCardData(cardData[i])
          return
        }
      }
      return
    }

    const data2 = (data)=>{
      for(let i=0;i<data.length; i++){
        if(data[i].learningTitle === generalSimpledata.title){
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
    data2(sturtureData)
    data(cardData)
  },[courseName,cardData,filteredCardData,filteredStructuralData,sturtureData,lenght,refresh])


  const displayPopup =(item,data)=>{
    console.log( item, data, "pop up info")
    setPeople(item)
    setPosition(data)
    setOnView(true)
    setonViewPeopleInfo(true)
 
  setPeopleInfo(data)
  }
 const handlePopDocInfo = (data)=>{
  setonViewDocInfo(true)
 
  setDocInfo(data)
 }

  return (
    <div className="admin__Unclear-container-management">
       {
      onViewPeopleInfo===true
      /*&& <AdminResume/>*/
      && <AdminSturcturalPeoplePopUpDetail setOnView={setOnView} onView={onView} data={people} position={position} setOnStructuralDetail={setOnStructuralDetail}/>
    }

{
      onViewDocInfo===true
      /*&& <AdminResume/>*/
      && <AdminSturcturalRelCoursePopUpDetail setOnView={setonViewDocInfo} onView={onViewDocInfo} data={DocInfo} position={position} setOnStructuralDetail={setOnStructuralDetail}/>
    }
      <div class="admin__stucture_btn-management admin__stucture_btn-zoom" onClick={()=>setZoom(zoom+0.1)}>  <ZoomIn /></div>
    <div class="admin__stucture_btn-management admin__stucture_btn-zoom-out" onClick={()=>setZoom(zoom-0.1)}><ZoomOut/></div>
    <div class="admin__stucture_btn-management admin__stucture_btn-zoom-init" onClick={()=>setZoom(1)}><Refresh/></div>
    <div className='admin_stucture_statistics-management'>
      <div className='admin_stucture_statistics_container-management'>
       
        <p>All Workers No: <span className='admin_stucture_statistics_span-management'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container-management'>
        <p>CM Workers No: <span className='admin_stucture_statistics_span-management'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container-management'>
        <p>Projects No: <span className='admin_stucture_statistics_span-management'>??</span></p>
      </div>
      <div className='admin_stucture_statistics_container-management'>
        <p className='admin_stucture_statistics_para-management' >Sick leaves No: <span className='admin_stucture_statistics_span'>02</span></p>
      </div>
      <div className='admin_stucture_statistics_container-management'>
        <p className='admin_stucture_statistics_para-management' >Loans No: <span className='admin_stucture_statistics_span'>02</span></p>
      </div>
      <div className='admin_stucture_statistics_container-management'>
        <p className='admin_stucture_statistics_para-management'>Company Hardware: <span className='admin_stucture_statistics_span'>02</span></p>
      </div>
      
    </div>
      <div className="admin__Unclear-content-management">
      <div className="admin__Unclear-btn-container-management">
      <button className="admin__Unclear-close-btn-management" onClick={handleManagementClose}>
      Okay
      </button>
      </div>

      <div className="admin__managementOnView-item">
        <h3 style={{textAlign:'center'}}>{generalSimpledata?.title ? generalSimpledata?.title:''} - management file</h3>
       
      </div>

      {/* ------------------------------------------managing the management body ------------------------------------------ */}
     
     <section>
      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Structure of suberCraftex.(move around with mouse to find management tree)</h3>
          <div className="admin__graph-content_apply " style={{transform: `scale(${zoom})`}}>

      <div className="admin__graph-board_apply" style={{width:`${lenght}rem`, backgroundColor:'#1364884f'}} >


      <div className="admin__app_tree">
          <ul className="ul">
          {/*company name*/}
              <li className="li"><nav className="AdminStructure__a-first" >

                        <div className="AdminStructure__company-logo">
                          <img src={filteredCardData.logo} alt="imgchild"/>
                        </div>

                        <div className="AdminStructure__company-mainItem">
                          <h3>Name: <span>{filteredCardData.learningTitle}</span></h3>
                          <h3>Location: <span>{  filteredStructuralData && filteredStructuralData.companyHeadOfficeLocation}</span></h3>

                        </div>
                      
                        <span className="AdminStructure__hoverSpan"style={{cursor:'pointer'}} onClick={()=>handlePopDocInfo(filteredStructuralData)} >more Info</span>

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
                              
                                <span className="AdminStructure__hoverSpan" style={{cursor:'pointer'}} onClick={()=>handlePopDocInfo(data,filteredStructuralData)}>more...</span>

                            </nav>
                          {(data.people && data.people.length!==0)?<ul className="ul">
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
                            </ul>:<></>}
                            {/* handleling level2 */}

                            { 
                              (data.companyLevel2 && data.companyLevel2.length!==0) 
                              ?<ul className="ul">{
                                data.companyLevel2.map((data2,i)=>(
                                 <li key={i} className="li">
                                     <nav>
         
                                         <div className="AdminStructure__company-logo">
                                           <img src={filteredCardData.logo} alt="imgchild"/>
                                         </div>
         
                                         <div className="AdminStructure__company-mainItem">
                                           <h3>Name: <span>{data2.name}</span></h3>
         
                                         </div>
                                       
                                         <span className="AdminStructure__hoverSpan" style={{cursor:'pointer'}} onClick={()=>handlePopDocInfo(data2,filteredStructuralData)}>more...</span>
         
                                     </nav>
                                   {(data2.people && data2.people.length!==0)?<ul className="ul">
                                   {/*CEO and people of the bourd of dirctor*/}
                                   {
                                      data2.people.map((item,i2)=>(
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
                                     </ul>:<></>}
                                     {/* handleling level3 */}
                            <Level3 data2={data2} filteredCardData={filteredCardData} displayPopup={displayPopup} handlePopDocInfo={handlePopDocInfo} filteredStructuralData={filteredStructuralData}/>
                                 </li>
                               ))
                             }</ul>
                              :<></>
                            }
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
      </div>


    </div>
  )
}

export default ProjectExpansionMangementPopup
