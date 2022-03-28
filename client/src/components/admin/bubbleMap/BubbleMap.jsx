import React from 'react'
import {scaleSqrt,max } from 'd3'
import {MarksMigMap} from '../../../components'

const BubbleMap = ({data,worldAtlas}) => {
  const sizeValue = d => d["Total Number of Dead and Missing"]
  const maxRadius = 15;
  const sizeScale = scaleSqrt()
    .domain([0,max(data,sizeValue)])
    .range([0, maxRadius])

    return <MarksMigMap worldAtlas={worldAtlas} data={data} sizeScale={sizeScale}sizeValue={sizeValue}/>


}

export default BubbleMap
