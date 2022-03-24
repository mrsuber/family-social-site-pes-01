import React from 'react'

const ColorLegend = ({ colorScale, tickSpacing, tickSize, tickTextOffset }) => {
  return colorScale.domain().map(( domainValue, i ) =>(
    <g transform = {`translate(0,${ i * tickSpacing })`}>
      <circle fill={colorScale(domainValue)} r={tickSize}/>
      <text dy=".32em" x={tickTextOffset} className="admin__colorlegend-text">{domainValue}</text>
    </g>
  ))

}

export default ColorLegend
