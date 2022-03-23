import React from 'react'
import {scaleBand, scaleLinear,max} from 'd3'
import './AxisBottom_map.css'


const AxisBottom_map = ({innerHeight,xScale,tickformat,tickOffset=3}) => {



  return (
    <>
    {xScale.ticks().map(tickValue =>(
      <g className="admin__his-tick" key={tickValue} transform={`translate(${xScale(tickValue)},${0})`}>
      <line y2={innerHeight} />
      <text dy=".71em" style={{textAnchor:'middle'}} y={innerHeight + tickOffset} >{tickformat(tickValue)}</text>
      </g>
    ))}
    </>
  )
}

export default AxisBottom_map
