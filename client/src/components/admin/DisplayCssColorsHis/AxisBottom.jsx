import React from 'react'
import {scaleBand, scaleLinear,max} from 'd3'

const AxisBottom = ({innerHeight,xScale}) => {



  return (
    <>
    {xScale.ticks().map(tickValue =>(
      <g key={tickValue} transform={`translate(${xScale(tickValue)},${0})`}>
      <line y2={innerHeight} stroke="white" />
      <text dy=".71em" style={{textAnchor:'middle'}} y={innerHeight + 3} >{tickValue}</text>
      </g>
    ))}
    </>
  )
}

export default AxisBottom
