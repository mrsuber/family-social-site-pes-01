import React from 'react'
import './CalenderMonth.css'
import {CalenderDay} from '../../../../components'
const CalenderMonth = ({month}) =>{
  return(
    <div className="calendermonth__wrapper">
      {month.map((row,index)=>(
          <React.Fragment key={index}>
          {row.map((day,index2)=>(
            <CalenderDay day={day} key={index2}/>
          ))}
          </React.Fragment>
        ))}
    </div>
  )
}

export default CalenderMonth
