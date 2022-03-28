import React from 'react'
import { scaleLinear,scaleTime,extent,timeFormat} from 'd3'
import './GlobalTemp.css'
import {AxisBottomTemp, AxisLeftTemp,MarksTemp} from '../../../components'

const GlobalTemp = ({data}) => {

  // const width = 600;
  // const height = 448;
    // const margin = {top: 20, right: 20, bottom: 35, left: 150}
  const width = 390;
  const height = 458;
  const margin = {top: 20, right: -160, bottom: -50, left: 50}

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const tickOffset = 5;
  const circleRadius = 2;


  const xAxisTickFormat = timeFormat("%a")

  const xAxisLabelOfset = 70
  const yAxisLabelOfset = 30


  const xAxisLabel = "Time in day"
  const yAxisLabel = "Temperature in °C"

  const xValue = d=>d.timestamp
  const yValue = d=> d.temperature


  const xScale = scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()

    .domain(extent(data,yValue))
    .range([innerHeight,0])
    .nice()



  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Analytics of Global Temperature</h3>
        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 600 448" style={{display: 'block'}}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottomTemp  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat} tickOffset={tickOffset}/>
            <text transform={`translate(${-yAxisLabelOfset}, ${innerHeight/2} ) rotate(-90) `} extAnchor="middle" className='admin__his-text-label'>{yAxisLabel}</text>

            <AxisLeftTemp yScale={yScale} innerWidth={innerWidth} tickOffset={tickOffset}/>
              <text x={innerWidth/2 - xAxisLabelOfset} y={innerHeight + yAxisLabelOfset} extAnchor="middle" className='admin__his-text-label'>{xAxisLabel}</text>
              <MarksTemp
              xScale={xScale}
              yScale={yScale}
              data={data}
              xValue={xValue}
              yValue={yValue}
              circleRadius={circleRadius}
              tooltipFormate={xAxisTickFormat}
              />
              </g>
            </svg>
          </div>
        </div>
    </div>
  )
}

export default GlobalTemp
