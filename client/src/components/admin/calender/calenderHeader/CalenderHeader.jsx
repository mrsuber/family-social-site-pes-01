import './CalenderHeader.css'

const CalenderHeader = ({data}) =>{

  return(
    <div className="CalenderHeader__wrapper">
      <img src={data.logo} alt="logo" className=" CalenderHeader__logo"/>
      <h1 className="CalenderHeader__heading">Calendar</h1>
      <button className="CalenderHeader__button">Today</button>
      <button className="CalenderHeader__button2">
        <span></span>
        <span></span>
      </button>
    </div>
  )
}
export default CalenderHeader
