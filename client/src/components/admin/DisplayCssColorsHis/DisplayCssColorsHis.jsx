import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
import {scaleBand, scaleLinear,max,format} from 'd3'
import './DisplayCssColorsHis.css'
import {AxisBottom, AxisLeft,Marks} from '../../../components'

const DisplayCssColorsHis = ({data}) => {

  const width = 600;
  const height = 448;
  const margin = {top: 20, right: 20, bottom: 35, left: 150}
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOfset = 70
  const yAxisLabelOfset = 30
  const siFormat = format('.2s')
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B')
  const yValue = d=> d.Country
  const xValue = d=>d.Population
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0,innerHeight])
    .paddingInner(0.15)
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])


  return (
    <div className="admin__graph-card admin__his-container">
        <h3 className="admin__section-head">Top Ten Countries population stats 2021</h3>
        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} style={{display: 'block'}}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottom  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat}/>
            <AxisLeft yScale={yScale}/>
              <text x={innerWidth/2 - xAxisLabelOfset} y={innerHeight + yAxisLabelOfset} extAnchor="middle" className='admin__his-text-label'>Population</text>
              <Marks xScale={xScale} yScale={yScale} data={data} xValue={xValue} yValue={yValue} tooltipFormate={xAxisTickFormat} />
              </g>
            </svg>
          </div>
        </div>
    </div>
  )
}

export default DisplayCssColorsHis
