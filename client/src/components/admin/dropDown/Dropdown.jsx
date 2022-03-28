import React from 'react'

const Dropdown = ({options,id,onSelectedValueChange,selectedValue,classLabel,AxisLabel}) => {
  return (<>
    <label for={id} className={classLabel} >{AxisLabel} </label>
    <select id ={id} onChange={event=> onSelectedValueChange(event.target.value)} >

    {options.map(({value,label},i) =>(
        <option key={i} value={value} selected={value===selectedValue}>
        {label}
        </option>
    ))}
    </select>
    </>
  )
}

export default Dropdown
