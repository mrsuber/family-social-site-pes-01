import React from 'react'
import './AxisBottom_irish.css'


const AxisBottom_irish = ({innerHeight,xScale,tickformat,tickOffset=3}) => {



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

export default AxisBottom_irish
