import React,{useState} from 'react'
import './source.css'
const Source = ({source, name,id}) => {

  const [open, setOpen]= useState(false)

  const getChckeboxValue = ()=> {
  
    setOpen(!open)
}

  return (
    <nav className="admin__profileOnView-nav">

    <label htmlFor={id}><span>{name} sources</span></label>
    <input type="checkbox" onClick={getChckeboxValue} id={id} style={{position:'absolute', opacity:0 , height:'0px'}} />

    <ul className="slide" style={open? {height:'154px'} : {}}>
      {
        source && source.map((d,i)=>(
          <li key={i}><a href={d.link} target="_blank" rel="noreferrer">{d.name}</a></li>
        ))
      }

    </ul>

    </nav>
  )
}

export default Source
