import React from 'react'

const ColorLegend = ({ colorScale, tickSpacing, tickSize, tickTextOffset, onHover,hoveredValue, fadeOpacity}) => {
  return colorScale.domain().map(( domainValue, i ) =>(
    <g transform = {`translate(0,${ i * tickSpacing })`} onMouseEnter={()=>{onHover(domainValue)}} onMouseOut={()=> {onHover(null)}} opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1 }>
      <circle fill={colorScale(domainValue)} r={tickSize} className="admin__colorlegend-circle"/>
      <text dy=".32em" x={tickTextOffset} className="admin__colorlegend-text">{domainValue}</text>
    </g>
  ))

}

export default ColorLegend
