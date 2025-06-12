import React from 'react'
import Level4 from './Level4'

const Level3 = ({data2,filteredCardData,displayPopup,handlePopDocInfo,filteredStructuralData}) => {
  return (
    <>
      { 
  (data2.companyLevel3 && data2.companyLevel3.length!==0) 
  ?<ul className="ul">{
    data2.companyLevel3.map((data3,i)=>(
     <li key={i} className="li">
         <nav>

             <div className="AdminStructure__company-logo">
               <img src={filteredCardData.logo} alt="imgchild"/>
             </div>

             <div className="AdminStructure__company-mainItem">
               <h3>Name: <span>{data3.name}</span></h3>

             </div>
           
             <span className="AdminStructure__hoverSpan" style={{cursor:'pointer'}} onClick={()=>handlePopDocInfo(data3,filteredStructuralData)}>more...</span>

         </nav>
       {(data3.people && data3.people.length!==0)?<ul className="ul">
       {/*CEO and people of the bourd of dirctor*/}
       {
          data3.people.map((item,i2)=>(
           <li key={i2} className="li">


             <nav>
             <div className="AdminStructure__company-logo">
               <img src={item.photo} alt="imgchild"/>
             </div>

             <div className="AdminStructure__company-mainItem">
               <h3>Name: <span>{item.name}</span></h3>


             </div>
             <span className="AdminStructure__hoverSpan" onClick={()=>displayPopup(item,data3)} style={{cursor:'pointer'}}>more...</span>
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
         
      {/* handleling level4 */}
      <Level4 data2={data3} filteredCardData={filteredCardData} displayPopup={displayPopup} handlePopDocInfo={handlePopDocInfo} filteredStructuralData={filteredStructuralData}/>
                                 
     </li>
   ))
 }</ul>
  :<></>
}


    </>
  )
}

export default Level3
