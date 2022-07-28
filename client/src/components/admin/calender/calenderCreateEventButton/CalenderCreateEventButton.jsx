import {useContext} from 'react'
import GlobalContext from '../../../../context/GlobalContext'


import './CalenderCreateEventButton.css'


const CalenderCreateEventButton = () => {
    const {setShowEventModal} = useContext(GlobalContext)
  return(
    <button className="calendercreateeventbutton__wrapper" onClick={()=>setShowEventModal(true)}>
    <span className="calendercreateeventbutton__span1">+</span>
      <span className="calendercreateeventbutton__span">Create</span>
    </button>
  )
}

export default CalenderCreateEventButton
