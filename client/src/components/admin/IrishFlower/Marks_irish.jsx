import React from 'react'

const Marks_irish = ({data, xScale, yScale,xValue,yValue,tooltipFormate,circleRadius,colorScale,colorValue}) => {
  return (
    <>
      {data.map((d,i) => <circle key={i} className="admin__plot-marks" cx={xScale(xValue(d))} cy={yScale(yValue(d))} fill={colorScale(colorValue(d))} r={circleRadius}>
        <title>{tooltipFormate(xValue(d))}</title>
      </circle>)}
    </>
  )
}

export default Marks_irish
