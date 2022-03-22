import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
import { scaleLinear,max,format,extent} from 'd3'
import './IrishFlower.css'
import {AxisBottomIrish, AxisLeftIrish,MarksIrish} from '../../../components'

const IrishFlower = ({data}) => {

  const width = 600;
  const height = 448;
  const margin = {top: 20, right: 20, bottom: 35, left: 120}
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const tickOffset = 5;
  const circleRadius = 7;

  const siFormat = format('.2s')
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B')


  const xAxisLabelOfset = 70
  const yAxisLabelOfset = 30


  const xAxisLabel = "Sepal Length"
  const yAxisLabel = "Sepal Width"

  const xValue = d=>d.sepal_length
  const yValue = d=> d.sepal_width


  const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()

    .domain(extent(data,yValue))
    .range([0,innerHeight])



  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Analytics of Iris Flower</h3>
        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} style={{display: 'block'}}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottomIrish  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat} tickOffset={tickOffset}/>
            <text transform={`translate(${-yAxisLabelOfset}, ${innerHeight/2} ) rotate(-90) `} extAnchor="middle" className='admin__his-text-label'>{yAxisLabel}</text>

            <AxisLeftIrish yScale={yScale} innerWidth={innerWidth} tickOffset={tickOffset}/>
              <text x={innerWidth/2 - xAxisLabelOfset} y={innerHeight + yAxisLabelOfset} extAnchor="middle" className='admin__his-text-label'>{xAxisLabel}</text>
              <MarksIrish
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

export default IrishFlower
