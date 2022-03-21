import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
import {scaleBand, scaleLinear,max} from 'd3'
import './DisplayCssColorsHis.css'
import {AxisBottom, AxisLeft,Marks} from '../../../components'

const DisplayCssColorsHis = ({data}) => {

  const width = 900;
  const height = 600;
  const margin = {top: 20, right: 20, bottom: 20, left: 200}
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const yValue = d=> d.Country
  const xValue = d=>d.Population
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0,innerHeight])
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])


  return (
    <div className="admin__graph-card">
        <h3 className="admin__section-head">countries Population in Histogram</h3>
        <div className="admin__graph-content">
          <div className="admin__graph-head">
            <div className="admin__icons-wrapper">
                <div className="admin__icon">
                  <span className="admin__las admin__la-eye admin__text-main"><FontAwesomeIcon icon={faEye} /></span>
                </div>

                <div className="admin__icon">
                  <span className="admin__las admin__la-eye admin__text-success"><FontAwesomeIcon icon={faClock} /></span>
                </div>
            </div>
            <div className="admin__graph-select">
              <select name="" id="">
                  <option value="">September</option>
              </select>
            </div>
          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottom  innerHeight={innerHeight} xScale={xScale}/>
            <AxisLeft yScale={yScale}/>
              <Marks xScale={xScale} yScale={yScale} data={data} xValue={xValue} yValue={yValue} />
              </g>
            </svg>
          </div>
        </div>
    </div>
  )
}

export default DisplayCssColorsHis
