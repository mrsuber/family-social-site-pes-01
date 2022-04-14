import React,{useState,useEffect} from 'react'
import './source.css'
const Source = ({source, name,id}) => {

  const [open, setOpen]= useState(false)
  const [size, setSize]= useState(154)

  const getChckeboxValue = ()=> {

    setOpen(!open)
}
useEffect(()=>{
  const settingHight = ()=>{
    if(source.length*35 > size){
      setSize(source.length*35)
    }
  }
  settingHight()
},[source,size])


  return (
    <div className="admin__profileOnView-nav">

    <label htmlFor={id}><span>{name} sources</span></label>
    <input type="checkbox" onClick={getChckeboxValue} id={id} style={{position:'absolute', opacity:0 , height:'0px'}} />

    <ul className="slide" style={open? {height:`${size}px`} : {}}>
      {
        source && source.map((d,i)=>(
          <li key={i}><a href={d.link} target="_blank" rel="noreferrer">{d.name}</a></li>
        ))
      }

    </ul>

    </div>
  )
}

export default Source
