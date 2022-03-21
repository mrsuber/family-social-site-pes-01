import React from 'react'
import {scaleBand, scaleLinear,max} from 'd3'
import './AxisBottom.css'


const AxisBottom = ({innerHeight,xScale,tickformat}) => {



  return (
    <>
    {xScale.ticks().map(tickValue =>(
      <g className="admin__his-tick" key={tickValue} transform={`translate(${xScale(tickValue)},${0})`}>
      <line y2={innerHeight} />
      <text dy=".71em" style={{textAnchor:'middle'}} y={innerHeight + 3} >{tickformat(tickValue)}</text>
      </g>
    ))}
    </>
  )
}

export default AxisBottom
