import React,{useEffect,useState} from 'react'
import './styles.css'
const Structure = ({companyName,cardData,strutureData,setOnStructuralDetail}) => {

    const[filteredCardData, setfilteredCardData] = useState([])
    const[filteredStructuralData,setFilteredStructuralData] = useState(null)
      const [lenght,setLenth] = useState(50)

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
      if((data && data.companyLevel1.length *20)> lenght ){
        setLenth(data.companyLevel1.length *20)
      }
    }

    const filteredStructuralDataCompanyLevel1PeopleLenght =(data)=>{
        console.log("i see hear")
        console.log(data)
      if(data!==null){

        for(let i=0;i<data.companyLevel1.length; i++){

          if((data.companyLevel1[i].people.length*20)>lenght){
            setLenth(data.companyLevel1[i].people.length*20)

          }
        }
      }
    }

    filteredStructuralDataCompanyLevel1Lenght(filteredStructuralData)
    filteredStructuralDataCompanyLevel1PeopleLenght(filteredStructuralData)



    data2(strutureData)
    data(cardData)



  },[companyName,cardData,filteredCardData,filteredStructuralData,strutureData,lenght])


console.log(lenght)







  return (
    <main className="admin__main-application">
    <section>
      <button className="admin__structural-back-btn" onClick={()=>setOnStructuralDetail(false)}>Back</button>
      <div className="admin__block-grid3">
      <div className="admin__graph-card admin__Irishhis-container">
          <h3 className="admin__section-head">Research before application</h3>
          <div className="admin__graph-content_apply ">

      <div className="admin__graph-board_apply" style={{width:`${lenght}rem`}}>
data
      <div className="admin__app_tree">
          <ul>
              <li ><a href="" className="AdminStructure__a-first">
                        <div className="AdminStructure__company-logo">
                          <img src={filteredCardData.logo} alt="imgchild"/>
                        </div>

                        <div className="AdminStructure__company-mainItem">
                          <h3>Name: <span>{filteredCardData.companyName}</span></h3>
                          <h3>Location: <span>{  filteredStructuralData && filteredStructuralData.companyHeadOfficeLocation}</span></h3>

                        </div>
                        <span className="AdminStructure__hoverSpan">more...</span>

                  </a>

                  <ul>
                    {
                      filteredStructuralData && filteredStructuralData.companyLevel1.map((data,i)=>(
                        <li key={i}>
                            <a href="">

                                <div className="AdminStructure__company-logo">
                                  <img src={filteredCardData.logo} alt="imgchild"/>
                                </div>

                                <div className="AdminStructure__company-mainItem">
                                  <h3>Name: <span>{data.name}</span></h3>

                                </div>
                                <span className="AdminStructure__hoverSpan">more...</span>

                            </a>
                          <ul>
                          {
                            data.people.map((item,i2)=>(
                              <li key={i2}>
                                <a href="">
                                <div className="AdminStructure__company-logo">
                                  <img src={item.photo} alt="imgchild"/>
                                </div>

                                <div className="AdminStructure__company-mainItem">
                                  <h3>Name: <span>{item.name}</span></h3>


                                </div>
                                <span className="AdminStructure__hoverSpan">more...</span>
                                </a></li>

                            ))
                          }
                            </ul>
                        </li>
                      ))
                    }
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
