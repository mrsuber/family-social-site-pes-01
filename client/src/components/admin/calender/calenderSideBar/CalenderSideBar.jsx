import {CalenderCreateEventButton,SmallCalender,CalenderLabels} from '../../../../components'
import './CalenderSideBar.css'


const CalenderSideBar = () =>{
  return(
    <aside className="calendersidbar__wraper">
    <CalenderCreateEventButton />
    <SmallCalender/>
    <CalenderLabels />
    </aside>
  )
}

export default CalenderSideBar
