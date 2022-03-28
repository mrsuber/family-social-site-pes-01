import React from 'react'
import {geoNaturalEarth1,geoPath,geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const  path = geoPath(projection)
const graticule = geoGraticule()

const Marks_map_mig = ({worldAtlas:{land, interiors}, data,sizeScale,sizeValue}) => {
  return (
    <g className="admin__map-marks">
    <path className="admin__map-shere" d={path({type:'Sphere'})}/>
    <path className="admin__map-graticule" d={path(graticule())} />

      {land.features.map(feature => (
        <path className="admin__map-feature" d={path(feature)} />
      ))
    }
      <path className="admin__map-interior" d={path(interiors)} />

      {data.map(d => {
        const [x,y] = projection(d.coords);
        return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} className="admin__map-cities"/>
      })}


    </g>
  )
}

export default Marks_map_mig
