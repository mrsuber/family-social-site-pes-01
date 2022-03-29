import React,{useState} from 'react'
import './WorldMap_mig.css'
import {BubbleMap,DateHistogram} from '../../../components'
const width = 890;

const height = 490;
const dateHistogramSize = 0.2;
const xValue = d=>d['Incident Date']


const WorldMap_mig = ({worldAtlas,data}) => {


  const [brushExtent, setBrushExtent] = useState()

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d)
    return date > brushExtent[0] && date < brushExtent[1]
  }): data


  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Missing Migrands Visualisation on WorldMap</h3>
        <div className="admin__graph-content_his ">
        <div className="admin__graph-head">

        </div>

          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 960 490" style={{display: 'block'}}>
              <BubbleMap data={data} worldAtlas={worldAtlas} filteredData={filteredData}/>
              <g transform={`translate(0,${height - dateHistogramSize * height})`}>
            <DateHistogram data={data} height={ dateHistogramSize * height} width={width} setBrushExtent={setBrushExtent} xValue={xValue}/>
              </g>
            </svg>
          </div>
        </div>
    </div>
  )
}

export default WorldMap_mig
