import React from 'react'

const Marks_irish = ({data, xScale, yScale,xValue,yValue,tooltipFormate,circleRadius}) => {
  return (
    <>
      {data.map(d => <circle className="admin__his-marks" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
        <title>{tooltipFormate(xValue(d))}</title>
      </circle>)}
    </>
  )
}

export default Marks_irish
