import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faClock} from '@fortawesome/free-solid-svg-icons';
// import { } from 'd3'
import './WorldMap.css'
import {MarksMap,Dropdown} from '../../../components'

const WorldMap = ({data}) => {

  const width = 890;
  const height = 490;

  const options= [
    {value:"dog",label:"Dog"},
      {value:"cat",label:"Cat"},
      {value:"parrot",label:"Parrot"}
  ]
  const initialValue = 'cat'
  const [selectedValue,setSelectedValue] = useState(initialValue)

  return (
    <div className="admin__graph-card admin__Irishhis-container">
        <h3 className="admin__section-head">Visaulising The Whole World</h3>
        <div className="admin__graph-content_his ">
        <div className="admin__graph-head">

          <div className="admin__graph-select">
            <Dropdown options={options} id="pet-select" onSelectedValueChange={setSelectedValue} selectedValue={selectedValue} />
          </div>
        </div>

          <div className="admin__graph-head">

          </div>
          <div className="admin__graph-board admin__svg-pop">
            <svg width={width} height={height} viewBox="0 0 960 490" style={{display: 'block'}}>

              <MarksMap data={data} />

            </svg>
          </div>
        </div>
    </div>
  )
}

export default WorldMap
