import React from 'react'
import {line,curveNatural} from 'd3'

const Marks_temp = ({data, xScale, yScale,xValue,yValue,tooltipFormate,circleRadius}) => {
  return (
    <g className="admin__tem-marks">
    <path

    d={line()
      .x(d=> xScale(xValue(d)))
      .y(d=> yScale(yValue(d)))
      .curve(curveNatural)(data)}
      />
      {/*data.map(d => <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
        <title>{tooltipFormate(xValue(d))}</title>
      </circle>)*/}
    </g>
  )
}

export default Marks_temp
