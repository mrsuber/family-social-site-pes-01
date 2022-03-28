import React from 'react'
import { scaleLinear,scaleTime,max,extent,timeFormat, bin, timeMonths,sum} from 'd3'
import './Migrands.css'
import {AxisBottomMig, AxisLeftMig,MarksMig} from '../../../components'

const Migrands = ({data}) => {


    const xAxisLabel = "Time"
    const yAxisLabel = "Total Number of Dead and Missing"

    const xValue = d=>d['Incident Date']
    const yValue = d=> d['Total Number of Dead and Missing']




    const width = 890;
    const height = 290;
  const margin = {top: 60, right: -10, bottom: -50, left: -30}

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const tickOffset = 5;



  const xAxisTickFormat = timeFormat("%m/%d/%y")

  const xAxisLabelOfset = 70
  const yAxisLabelOfset = 30



  const xScale = scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice()



  const [start,stop] = xScale.domain()
  const binnedData = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start,stop))
        (data)
        .map(array => ({
          y: sum(array,yValue),
          x0:array.x0,
          x1:array.x1
        }))
    const yScale = scaleLinear()

      .domain([0, max(binnedData, d=>d.y)])
      .range([innerHeight,0])
      .nice()

  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Analytics of Global Missing Migrands</h3>
        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 800 400" style={{display: 'block'}}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottomMig  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat} tickOffset={tickOffset}/>
            <text transform={`translate(${-yAxisLabelOfset - 10 }, ${innerHeight/2 + 100} ) rotate(-90) `} extAnchor="middle" className='admin__his-text-label'>{yAxisLabel}</text>

            <AxisLeftMig yScale={yScale} innerWidth={innerWidth} tickOffset={tickOffset}/>
              <text x={innerWidth/2 - xAxisLabelOfset } y={innerHeight + yAxisLabelOfset } extAnchor="middle" className='admin__his-text-label'>{xAxisLabel}</text>
              <MarksMig
              xScale={xScale}
              yScale={yScale}
              binnedData={binnedData}
              innerHeight={innerHeight}
              tooltipFormate={d=>d}
              />
              </g>
            </svg>
          </div>
        </div>
    </div>
  )
}

export default Migrands
