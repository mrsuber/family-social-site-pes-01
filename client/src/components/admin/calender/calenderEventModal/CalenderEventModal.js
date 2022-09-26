
import {useContext,useState} from 'react'
import './CalenderEventModal.css'
import GlobalContext from '../../../../context/GlobalContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
const CalenderEventModal = () =>{
  const {setShowEventModal,daySelected} = useContext(GlobalContext)
  console.log()
  const [title,setTitle] = useState('')
  return(
    <div className="eventModal">
      <form className="eventModal__form">
        <div className="eventModal__header">
          <span className="eventModal__span">
          <FontAwesomeIcon icon={faMinus} />
            </span>
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
            <span className='eventModal__Schedule_icon'>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
          </div>
        </div>
      </form>
    </div>
  )
}
export default CalenderEventModal
