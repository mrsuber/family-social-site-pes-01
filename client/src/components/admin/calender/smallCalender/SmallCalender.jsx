import {useState,useEffect} from 'react'
import dayjs from 'dayjs'
import {getMonth} from '../../../../utils/formatCalenderDays'

import './SmallCalender.css'
const SmallCalender = () =>{
  const [currentMonthIndex,setCurrentMonthIndex]= useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  useEffect(()=>{
    setCurrentMonth(getMonth(currentMonthIndex))
  },[currentMonthIndex])
  return(
    <div className="smallcalender__wrapper">
      <div className="smallCalender__header">
        <p className="smallCalender__p"></p>
      </div>
    </div>
  )
}
export default SmallCalender
