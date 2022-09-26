import './CalenderDay.css'
import dayjs from "dayjs"
import { useContext } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
const CalenderDay = ({day,rowIdx})=>{
  function getCurrentDayClass(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "calenderDay__active":''
  }
  const {setDaySelected, setShowEventModal} = useContext(GlobalContext)
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
          {"dd"}
    </div>

    </div>
  )
}
export default CalenderDay
