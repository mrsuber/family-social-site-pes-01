import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
// import { } from 'd3'
import './WorldMap.css'
import {MarksMap,Dropdown} from '../../../components'

const WorldMap = ({worldAtlas,cities}) => {

  const width = 890;
  const height = 490;



  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">The Whole World With Most Populated Cities</h3>
        <div className="admin__graph-content_his ">
        <div className="admin__graph-head">

        </div>

          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 960 490" style={{display: 'block'}}>

              <MarksMap worldAtlas={worldAtlas} cities={cities}/>

            </svg>
          </div>
        </div>
    </div>
  )
}

export default WorldMap
