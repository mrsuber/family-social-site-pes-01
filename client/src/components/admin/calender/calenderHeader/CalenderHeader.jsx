import './CalenderHeader.css'
import arrow from './arrow.png'
const CalenderHeader = ({data}) =>{

  return(
    <div className="CalenderHeader__wrapper">
      <img src={data.logo} alt="logo" className=" CalenderHeader__logo"/>
      <h1 className="CalenderHeader__heading">Calendar</h1>
      <button className="CalenderHeader__button">Today</button>
      <button className="CalenderHeader__button2">
        <span><img src={arrow}/></span>
      </button>
      <button className="CalenderHeader__button2">
        <span><img className="CalenderHeader__button2" src={arrow}/></span>
      </button>
    </div>
  )
}
export default CalenderHeader
