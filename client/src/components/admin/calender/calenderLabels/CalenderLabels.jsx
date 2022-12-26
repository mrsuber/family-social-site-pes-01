import React, { useContext } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
import './CalenderLabels.css'

const CalenderLabels = () => {
  const {labels,updateLabel} = useContext(GlobalContext)
  return (
    <div className='calender__lable_wapper'>
      <p className='calender__lable_p'>
        Label
      </p>
      
      {labels.map(({label: lbl, checked}, idx) =>(
        <div>
          <label key={idx} className="calender__lable_label">
          <input 
          type="checkbox" 
          checked={checked} 
          className="calender__lable_input"
          onChange={()=> updateLabel({label:lbl, checked: !checked})}
          style={{accentColor:lbl}} />
          <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
        </label>
        </div>
      
      ))}
    </div>
  )
}

export default CalenderLabels
