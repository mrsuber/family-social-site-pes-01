
import {useContext} from 'react'
import './CalenderEventModal.css'
import GlobalContext from '../../../../context/GlobalContext'

const CalenderEventModal = () =>{
  const {setShowEventModal} = useContext(GlobalContext)

  return(
    <div className="eventModal">
      <form className="eventModal__form">
        <div className="eventModal__header">
          <span className="eventModal__span">-</span>
          <button onClick={()=>setShowEventModal(false)}>close</button>
        </div>
      </form>
    </div>
  )
}
export default CalenderEventModal
