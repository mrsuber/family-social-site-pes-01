import React from 'react'

const Marks_mig = ({binnedData, xScale, yScale,tooltipFormate,innerHeight,color}) => {
  return (
    <g className={color? color :`admin__mig-marks `}>

      {binnedData.map((d, i) => <rect key={i} x={xScale(d.x0)} y={yScale(d.y)} width={xScale(d.x1) - xScale(d.x0)} height={innerHeight - yScale(d.y)}>
        <title>{tooltipFormate(d.y)}</title>
      </rect>)}
    </g>
  )
}

export default Marks_mig
