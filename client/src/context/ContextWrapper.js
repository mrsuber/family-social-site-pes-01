import React,{useState,useEffect} from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'
const ContextWrapper = (props) =>{
  const [monthIndex,setMonthIndex]= useState(dayjs().month())
  const [smallCalenderMonth,setSmallCalenderMonth]= useState(null)
  const [daySelected,setDaySelected]= useState(null)
  const [showEventModal,setShowEventModal]= useState(false)

useEffect(()=>{
    if(smallCalenderMonth !== null){
      setMonthIndex(smallCalenderMonth)
    }
  },[smallCalenderMonth])
  return(
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalenderMonth,
      setSmallCalenderMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper
