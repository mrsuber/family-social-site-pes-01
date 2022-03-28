import React from 'react'

const AxisLeft = ({yScale}) => {
  return (
    <>
    {yScale.domain().map((tickValue,i) =>(
      <g key={i} className="admin__his-tick">
    <text key={tickValue} style={{textAnchor:'end'}} x={-3} dy=".32em" y={yScale(tickValue) + yScale.bandwidth() / 2}> {tickValue}</text>
    </g>
    ))}
    </>
  )
}

export default AxisLeft
