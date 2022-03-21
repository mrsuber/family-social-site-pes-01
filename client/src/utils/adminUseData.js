import {useEffect,useState} from 'react'
import { csv } from 'd3'

const CSSurl = "https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/CSS%20Named%20Colors%20-%20Sheet.csv"
const UN_pop_url="https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/population_2019_2020.csv"

//country data
export const useCountryData = ()=>{
  const [data1,setData1]=useState([])
  useEffect(()=>{

    const row = d =>{
      d.Population = +d['2020'] * 1000
      return d
    }
    csv(UN_pop_url, row).then(data => {
      setData1(data.slice(0,10))
    })
  },[])

  return data1;
}

//css Data
export const useCssColorData = ()=>{
  const [data2,setData2]=useState([])
  useEffect(()=>{
    csv(CSSurl).then(setData2)

  },[])

  return data2;
}
