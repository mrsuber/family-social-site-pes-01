import React, {useState,useCallback} from 'react'
import './DisplayCssColorsPie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
import { arc,pie } from 'd3'


const DisplayCssColorsPie = ({data}) => {

const width = 900;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

// const centerX = 100;
// const centerY = 50;

const colorPie = pie().value(1)

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width)
  // .startAngle(Math.PI / 2)
  // .endAngle(Math.PI * 3 / 2)

  return (
    <div className="admin__graph-card">
        <h3 className="admin__section-head">Display Colors in Pie Card</h3>
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

          </div>
          <div className="admin__graph-board">
            <div>
              <svg className="admin__pie-svg" width={width} height={height}>
              <g transform={`translate(${centerX}.${centerY})`}>
              {
                colorPie(data).map(d =>(
                  <path
                    fill={d.data['RGB hex value']}
                    d={pieArc(d)}
                  />
                ))
              }
              {/*
                data.map((item,index) =>(
                  <path key ={index} fill={item['RGB hex value']} d={pieArc({
                    startAngle:index / data.length * 2 * Math.PI,
                    endAngle:(index + 1) / data.length * 2 * Math.PI
                  })}/>
                ))
              */}
              </g>
              </svg>

            </div>
          </div>
        </div>
    </div>
  )
}

export default DisplayCssColorsPie
