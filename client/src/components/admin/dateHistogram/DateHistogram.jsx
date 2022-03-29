import React,{useRef,useEffect,useMemo} from 'react'
import { scaleLinear,scaleTime,max,extent,timeFormat, bin, timeMonths,sum,brushX,select} from 'd3'
import {AxisBottomMig,AxisLeftMig,MarksMig} from '../../../components'

const margin = {top: 5, right: 30, bottom: 0, left: 150}

  const xAxisTickFormat = timeFormat("%m/%d/%y")
  const xAxisLabel = "Time"
  const yAxisLabel = "Total Number of Dead and Missing"


  const yValue = d=> d['Total Number of Dead and Missing']

const DateHistogram = ({data,height,width,setBrushExtent,xValue}) => {
  const brushRef = useRef();


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right
  const tickOffset = 5;




  const xAxisLabelOfset = 70
  const yAxisLabelOfset = 30



  const xScale = useMemo(
    () =>
    scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice(),
    [data,xValue,innerWidth]
  )





  const binnedData = useMemo(
    ()=>{
      const [start,stop] = xScale.domain()
    return bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start,stop))
        (data)
        .map(array => ({
          y: sum(array,yValue),
          x0:array.x0,
          x1:array.x1
        }))},
        [data, xScale,xValue]
      )
    const yScale = useMemo(
      ()=>
      scaleLinear()

      .domain([0, max(binnedData, d=>d.y)])
      .range([innerHeight,0])
      .nice(),
      [binnedData,innerHeight]
    )

    useEffect(()=>{
      const brush = brushX().extent([[0,0],[innerWidth,innerHeight]])
      brush(select(brushRef.current))
      brush.on('brush end', (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert))
      })
    },[innerWidth,innerHeight,xScale,setBrushExtent])

    return (
      <>
      <rect width={width+50} height={height+22} className="admin__mig_background"/>
      <g transform={`translate(${margin.left},${margin.top})`}>

      <AxisBottomMig  innerHeight={innerHeight} xScale={xScale} tickformat={xAxisTickFormat} tickOffset={tickOffset}/>
      <text transform={`translate(${-yAxisLabelOfset - 10 }, ${innerHeight/2 + 60} ) rotate(-90) `} extAnchor="middle" className='admin__his2-text-label'>{yAxisLabel}</text>

      <AxisLeftMig yScale={yScale} innerWidth={innerWidth} tickOffset={tickOffset}/>
        <text x={innerWidth/2 - xAxisLabelOfset } y={innerHeight + yAxisLabelOfset } extAnchor="middle" className='admin__his2-text-label'>{xAxisLabel}</text>
        <MarksMig
        xScale={xScale}
        yScale={yScale}
        binnedData={binnedData}
        innerHeight={innerHeight}
        tooltipFormate={d=>d}
        color='admin__his2-color'
        />
        <g ref={brushRef} />
        </g>
        </>
    )
}



export default DateHistogram
