import React, {useState,useEffect,useContext} from 'react'
import dayjs from 'dayjs'
import {getMonth} from '../../../../utils/formatCalenderDays'
import arrow from '../../../../images/admin/arrow.png'
import GlobalContext from '../../../../context/GlobalContext'

import './SmallCalender.css'
const SmallCalender = () =>{
  const [currentMonthIndex,setCurrentMonthIndex]= useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  useEffect(()=>{
    setCurrentMonth(getMonth(currentMonthIndex))
  },[currentMonthIndex])
  function handlePrevMonth(){
    setCurrentMonthIndex(currentMonthIndex - 1)
  }
  function handleNextMonth(){
    setCurrentMonthIndex(currentMonthIndex + 1)
  }
  function getDayClass(day){
    const format = "DD-MM-YY"
    const nowDay = dayjs().format(format)
    const currDay = day.format(format)

    if(nowDay === currDay){
      return 'smallCalender__dayBacground'
    }else {
      return ''
    }
  }

  const {
    monthIndex,
    setSmallCalenderMonth,
    setDaySelected,
  } = useContext(GlobalContext)

  useEffect(()=>{
    setCurrentMonthIndex(monthIndex)
  },[monthIndex])
  return(
    <div className="smallcalender__wrapper">
      <div className="smallCalender__header">
        <p className="smallCalender__p">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
        </p>
        <div className="smallCalender__buttonContainer">
        <button className="CalenderHeader__button2" style={{padding:'0px',margin: '0 3px',width: '30px', height: '30px'}} onClick={handlePrevMonth}>
          <span><img className="CalenderHeader__img2" src={arrow}/></span>
        </button>
        <button className="CalenderHeader__button3" style={{padding:'0px',margin: '0 3px',width: '30px', height: '30px'}} onClick={handleNextMonth}>
          <span><img className="CalenderHeader__img3" src={arrow}/></span>
        </button>
        </div>

      </div>
      <div className="smallCalender__body">
          {currentMonth[0].map((day,i) =>(
            <span key={i} className="smallCalender__innerbody">
              {day.format('dd').charAt(0)}
            </span>
          ))}

          {
            currentMonth.map((row,i)=>(
              <React.Fragment key={i}>
                  {row.map((day,idx)=>(
                    <button
                    onClick={()=>{
                      setSmallCalenderMonth(currentMonthIndex)
                      setDaySelected()
                    }}
                    key={idx} className={`CalenderHeader__button3 ${getDayClass(day)}`} style={{padding: '3px 0',width: '100%',}}>
                        <span style={{fontSize: '12px'}}>{day.format('D')}</span>
                    </button>
                  ))}
              </React.Fragment>
            ))
          }
      </div>
    </div>
  )
}
export default SmallCalender
