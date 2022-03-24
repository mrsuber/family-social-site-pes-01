import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
import { scaleLinear,max,format,extent,scaleOrdinal} from 'd3'
import './IrishFlower.css'
import {AxisBottomIrish, AxisLeftIrish,MarksIrish,Dropdown,ColorLegend} from '../../../components'
const attributes = [
  {value:"sepal_length", label:"Sepal Length"},
  {value:"sepal_width", label: "Sepal Width"},
  {value:"petal_length", label: "Petal Length"},
  {value:"petal_width", label:"Petal Width"},
  {value:"species", label:'Species'}
]

const getLabel = value => {
  for(let i = 0 ; i<attributes.length; i++){
    if(attributes[i].value ===value){
      return attributes[i].label
    }
  }
}

const width = 440;
const height = 420;
const margin = {top: -20, right: 65, bottom: 45, left: 40}
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right
const tickOffset = 5;
const circleRadius = 4;

const tickSpacing = 20;
const tickSize = 7
const tickTextOffset = 20

const fadeOpacity = 0.2

const xAxisLabelOfset = 70
const yAxisLabelOfset = 30





const siFormat = format('.2s')
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B')



const IrishFlower = ({data}) => {
  const [hoveredValue, setHoveredValue] = useState(null)


  const initialxAttribute = 'sepal_length'
  const initialyAttribute = 'sepal_width'
  const [xAttribute,setXAttribute] = useState(initialxAttribute)
  const [yAttribute,setYAttribute] = useState(initialyAttribute)

  const xValue = d=>d[xAttribute]
  const yValue = d=>d[yAttribute]


  const colorValue = d=>d.species
  const colorLegendLabel = 'Species'

  const xAxisLabel = getLabel(xAttribute)
  const yAxisLabel = getLabel(yAttribute)

  const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()

    .domain(extent(data,yValue))
    .range([0,innerHeight])
    .nice()

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A','#137B80','#8E6C8A'])

    const filteredData = data.filter(d => hoveredValue === colorValue(d))



  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Analytics of Iris Flower</h3>

        <div className="admin__graph-content_his ">
          <div className="admin__graph-head">
          <div className="admin__graph-select">
            <Dropdown options={attributes} id="y-select" AxisLabel="Y" onSelectedValueChange={setYAttribute} selectedValue={yAttribute} classLabel="admin__irisFlowery" />
          </div>
          <div className="admin__graph-select">
            <Dropdown options={attributes} id="x-select" AxisLabel="X" onSelectedValueChange={setXAttribute} selectedValue={xAttribute} classLabel="admin__irisFlower" />
          </div>


          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 500 348" style={{display: 'block'}}>
            <g transform={`translate(${margin.left},${margin.top})`}>

            <AxisBottomIrish  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat} tickOffset={tickOffset}/>
            <text transform={`translate(${-yAxisLabelOfset}, ${innerHeight/2} ) rotate(-90) `} extAnchor="middle" className='admin__his-text-label'>{yAxisLabel}</text>

            <AxisLeftIrish yScale={yScale} innerWidth={innerWidth} tickOffset={tickOffset}/>
              <text x={innerWidth/2 - xAxisLabelOfset} y={innerHeight + yAxisLabelOfset} extAnchor="middle" className='admin__his-text-label'>{xAxisLabel}</text>
              <g transform={`translate(${innerWidth + 20},60)`}>
              <text x={20} y={-30}  extAnchor="middle" className='admin__flower-text-label'>{colorLegendLabel}</text>

              <ColorLegend
                colorScale={colorScale}
                tickSpacing={tickSpacing}
                tickSize={tickSize}
                tickTextOffset={tickTextOffset}
                onHover={setHoveredValue}
                hoveredValue={hoveredValue}
                fadeOpacity={fadeOpacity}
              />
              </g>
              <g opacity={hoveredValue? fadeOpacity : 1}>
              <MarksIrish
              xScale={xScale}
              yScale={yScale}

              data={data}

              xValue={xValue}
              yValue={yValue}

              colorScale={colorScale}
              colorValue={colorValue}



              circleRadius={circleRadius}
              tooltipFormate={xAxisTickFormat}
              />
              </g>

              <MarksIrish
              xScale={xScale}
              yScale={yScale}

              data={filteredData}

              xValue={xValue}
              yValue={yValue}

              colorScale={colorScale}
              colorValue={colorValue}



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
