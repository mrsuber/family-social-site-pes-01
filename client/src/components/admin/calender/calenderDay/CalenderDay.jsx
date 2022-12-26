import './CalenderDay.css'
import dayjs from "dayjs"
import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
const CalenderDay = ({day,rowIdx})=>{
  const [dayEvents, setDayEvents] = useState([])
  const {setDaySelected, setShowEventModal,savedEvents,setSelectedEvent} = useContext(GlobalContext)
  useEffect(()=>{
    const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
    setDayEvents(events)
  },[savedEvents,day])
  function getCurrentDayClass(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "calenderDay__active":''
  }
  return(
    <div className="calenderDay__wrapper">
    <div className="calenderDay__header">
      {rowIdx === 0 && (
        <p className="calenderDay__text2">{day.format('ddd').toUpperCase()}</p>
      )}
      <p className={`calenderDay__text ${getCurrentDayClass()}`}>{day.format('DD')}</p>
      
    </div>
    <div className='calenderDay__wrapper2' onClick={()=>{
      setDaySelected(day)
      setShowEventModal(true)
    }}>
          {dayEvents.map((evt,idx)=>(
            <div 
              key={idx}
              style={{background:`${evt.label}`}}
              className="calenderDay__event"
              onClick={()=>setSelectedEvent(evt)}
            >
              {evt.title}
            </div>
          ))}
    </div>

    </div>
  )
}
export default CalenderDay
