import {CalenderCreateEventButton,SmallCalender} from '../../../../components'
import './CalenderSideBar.css'


const CalenderSideBar = () =>{
  return(
    <aside className="calendersidbar__wraper">
    <CalenderCreateEventButton />
    <SmallCalender/>
    
    </aside>
  )
}

export default CalenderSideBar
