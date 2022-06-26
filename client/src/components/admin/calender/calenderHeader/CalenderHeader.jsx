import './CalenderHeader.css'

const CalenderHeader = ({data}) =>{

  return(
    <div className="CalenderHeader__wrapper">
      <img src={data.logo} alt="logo" className=" CalenderHeader__logo"/>
    </div>
  )
}
export default CalenderHeader
