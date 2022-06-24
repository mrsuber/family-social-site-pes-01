import './CalenderDay.css'
const CalenderDay = ({day})=>{
  return(
    <div className="calenderDay__wrapper">
    
    {day.format()}
    </div>
  )
}
export default CalenderDay
