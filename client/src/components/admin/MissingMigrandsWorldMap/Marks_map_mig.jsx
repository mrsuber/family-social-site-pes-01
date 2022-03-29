import React,{useMemo} from 'react'
import {geoNaturalEarth1,geoPath,geoGraticule} from 'd3'

const projection = geoNaturalEarth1()
const  path = geoPath(projection)
const graticule = geoGraticule()

const Marks_map_mig = ({worldAtlas:{land, interiors}, data,sizeScale,sizeValue}) => {
  return (
    <g className="admin__map-marks">
      {useMemo(()=><>
         <path className="admin__map-shere" d={path({type:'Sphere'})}/>
        <path className="admin__map-graticule" d={path(graticule())} />

          {land.features.map((feature, i) => (
            <path  key={i} className="admin__map-feature" d={path(feature)} />
          ))
        }
          <path className="admin__map-interior" d={path(interiors)} />
          </>,[land,interiors])
        }
      {data.map((d,i) => {
        const [x,y] = projection(d.coords);
        return <circle key={i} cx={x? x: 0} cy={y? y: 0} r={sizeScale(sizeValue(d))} className="admin__map_mig-cities"/>
      })}


    </g>
  )
}

export default Marks_map_mig
