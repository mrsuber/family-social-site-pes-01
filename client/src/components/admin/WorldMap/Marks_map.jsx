import React from 'react'
import {geoNaturalEarth1,geoPath,geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const  path = geoPath(projection)
const graticule = geoGraticule()

const Marks_map = ({data:{land, interiors}}) => {
  return (
    <g className="admin__map-marks">
    <path className="admin__map-shere" d={path({type:'Sphere'})}/>
    <path className="admin__map-graticule" d={path(graticule())} />

      {land.features.map(feature => (
        <path className="admin__map-feature" d={path(feature)} />
      ))
    }


      <path className="admin__map-interior" d={path(interiors)} />


    </g>
  )
}

export default Marks_map
