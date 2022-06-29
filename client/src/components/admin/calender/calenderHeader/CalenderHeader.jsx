import React,{useContext} from 'react'
import GlobalContext from '../../../../context/GlobalContext'
import './CalenderHeader.css'
import arrow from './arrow.png'
import dayjs from 'dayjs'


const CalenderHeader = ({data}) =>{
  const {monthIndex,setMonthIndex} = useContext(GlobalContext)
  function handlePrevMonth(){
    setMonthIndex(monthIndex - 1)
  }

  function handleNextMonth(){
    setMonthIndex(monthIndex + 1)
  }
  return(
    <div className="CalenderHeader__wrapper">
      <img src={data.logo} alt="logo" className=" CalenderHeader__logo"/>
      <h1 className="CalenderHeader__heading">Calendar</h1>
      <button className="CalenderHeader__button">Today</button>
      <button className="CalenderHeader__button2" onClick={handlePrevMonth}>
        <span><img className="CalenderHeader__img2" src={arrow}/></span>
      </button>
      <button className="CalenderHeader__button3" onClick={handleNextMonth}>
        <span><img className="CalenderHeader__img3" src={arrow}/></span>
      </button>
      <h2>{dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}</h2>
    </div>
  )
}
export default CalenderHeader
