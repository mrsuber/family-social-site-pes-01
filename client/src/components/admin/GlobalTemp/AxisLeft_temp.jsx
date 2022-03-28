import React from 'react'

const AxisLeft_temp = ({yScale,innerWidth,tickOffset=3}) => {
  return (
    <>
    {yScale.ticks().map((tickValue, i) =>(
      <g key={i} className="admin__his-tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
    <text key={tickValue} style={{textAnchor:'end'}} x={-tickOffset} dy=".32em"> {tickValue}</text>
    </g>
    ))}
    </>
  )
}

export default AxisLeft_temp
