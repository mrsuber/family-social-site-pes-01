import React from 'react'

const AxisLeft_irish = ({yScale,innerWidth,tickOffset=3}) => {
  return (
    <>
    {yScale.ticks().map(tickValue =>(
      <g className="admin__his-tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
    <text key={tickValue} style={{textAnchor:'end'}} x={-tickOffset} dy=".32em"> {tickValue}</text>
    </g>
    ))}
    </>
  )
}

export default AxisLeft_irish
