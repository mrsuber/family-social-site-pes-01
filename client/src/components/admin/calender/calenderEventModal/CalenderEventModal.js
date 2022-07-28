
import {useContext,useState} from 'react'
import './CalenderEventModal.css'
import GlobalContext from '../../../../context/GlobalContext'

const CalenderEventModal = () =>{
  const {setShowEventModal} = useContext(GlobalContext)
  const [title,setTitle] = useState('')
  return(
    <div className="eventModal">
      <form className="eventModal__form">
        <div className="eventModal__header">
          <span className="eventModal__span">-</span>
          <button onClick={()=>setShowEventModal(false)}>close</button>
        </div>
        <div className="eventModal__formbody">
          <div className="eventModal__formbodychild">
            <div></div>
            <input
            type="text"
            name="title"
            placeholder="Add Tittle"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            className="eventModal__formInput"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
export default CalenderEventModal
