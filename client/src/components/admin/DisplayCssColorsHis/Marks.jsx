import React from 'react'

const Marks = ({data, xScale, yScale,xValue,yValue,tooltipFormate}) => {
  return (
    <>
      {data.map(d => <rect className="admin__his-marks" key={yValue(d)} x={0} y={yScale(yValue(d))} width={xScale(xValue(d))} height={yScale.bandwidth()}>
        <title>{tooltipFormate(xValue(d))}</title>
      </rect>)}
    </>
  )
}

export default Marks
