import './CalenderDay.css'
import dayjs from "dayjs"
const CalenderDay = ({day,rowIdx})=>{
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

    </div>
  )
}
export default CalenderDay
