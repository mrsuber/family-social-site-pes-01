import React from 'react'
import {geoNaturalEarth1,geoPath,geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const  path = geoPath(projection)
const graticule = geoGraticule()

const Marks_map = ({worldAtlas:{land, interiors}, cities}) => {
  return (
    <g className="admin__map-marks">
    <path className="admin__map-shere" d={path({type:'Sphere'})}/>
    <path className="admin__map-graticule" d={path(graticule())} />

      {land.features.map(feature => (
        <path className="admin__map-feature" d={path(feature)} />
      ))
    }
      <path className="admin__map-interior" d={path(interiors)} />

      {cities.map(d => {
        const [x,y] = projection([d.lng , d.lat]);
        return <circle cx={x} cy={y} r={1.5} className="admin__map-cities"/>
      })}


    </g>
  )
}

export default Marks_map
