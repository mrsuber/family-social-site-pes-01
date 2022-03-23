import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
// import { } from 'd3'
import './WorldMap.css'
import {MarksMap} from '../../../components'

const WorldMap = ({data}) => {

  const width = 960;
  const height = 490;



  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Visaulising The Whole World</h3>
        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} style={{display: 'block'}}>

              <MarksMap data={data}/>

            </svg>
          </div>
        </div>
    </div>
  )
}

export default WorldMap
