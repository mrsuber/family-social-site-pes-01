
import {useContext,useState} from 'react'
import './CalenderEventModal.css'
import GlobalContext from '../../../../context/GlobalContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMinus,
  faPen,
  faBookmark,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
let labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];


const CalenderEventModal = () =>{
  const {setShowEventModal,daySelected, dispatchCalEvent,selectedEvent} = useContext(GlobalContext)

  
  const [title,setTitle] = useState(selectedEvent ? selectedEvent.title : "")
  const [description,setDescription] = useState(selectedEvent ? selectedEvent.description : "")
  const [selectedLabel,setSelectedLable] = useState(selectedEvent ? labelsClasses.find((lbl)=> lbl===selectedEvent.label): labelsClasses[0])
 
  const handleSubmit = (e)=>{
    e.preventDefault()
    const calenderEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now()
    }
    if(selectedEvent){
      dispatchCalEvent({type:'update', payload:calenderEvent})
    }else{
          dispatchCalEvent({type:'push', payload:calenderEvent})

    }
    setShowEventModal(false)
  }
  return(
    <div className="eventModal">
      <form className="eventModal__form">
        <div className="eventModal__header">
          <span className="eventModal__span">
          <FontAwesomeIcon icon={faMinus} />
            </span>
            <div className='eventModal__button_wrapper'>
              {selectedEvent && (
                <button onClick={()=>{
                  dispatchCalEvent({type:"delete", payload:selectedEvent})
                  setShowEventModal(false)
                }}>delete</button>
              )}
              <button onClick={()=>setShowEventModal(false)}>close</button>
            </div>
          
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
            <span className='eventModal__Schedule_icon'>
              <FontAwesomeIcon icon={faPen} />
            </span>
            <input
            type="text"
            name="description"
            placeholder="Add a description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            className="eventModal__formInput eventModal__formInput2"
            />
            <span className='eventModal__Schedule_icon'>
              <FontAwesomeIcon icon={faBookmark} />
            </span>
            <div className='eventModal__formInput_bookmark'>
              {
                labelsClasses.map((lblClass,i)=>(
                  <span 
                  key={i}
                  onClick={()=>setSelectedLable(lblClass)}
                  style={{backgroundColor:`${lblClass}`}}
                    className='eventModal__formInput_checkstyle'
                  >
                    {selectedLabel === lblClass && <FontAwesomeIcon icon={faCheck} />}
                      
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className='eventModal__footer'>
                <button 
                  onClick={handleSubmit}
                  type='submit' 
                  className='calendercreateeventbutton__wrapper'>
                  Save
                </button>
        </div>
      </form>
    </div>
  )
}
export default CalenderEventModal
