import {useEffect,useState} from 'react'
import { csv } from 'd3'

const CSSurl = "https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/CSS%20Named%20Colors%20-%20Sheet.csv"
const UN_pop_url="https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/population_2019_2020.csv"

const IrishFlowerUrl ="https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv"
// data source https://gist.github.com/curran/a08a1080b88344b0c8a7#file-iris-csv

const GlobalTempUrl = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv"
// source https://gist.github.com/curran/90240a6d88bdb1411467b21ea0769029

//iris flower data
export const useTempData = ()=>{
  const [data3,setData3]=useState([])
  useEffect(()=>{

    const row = d =>{
      d.temperature = +d.temperature
      d.timestamp = new Date(d.timestamp)
      return d
    }
    csv(GlobalTempUrl, row).then(setData3)
  },[])

  return data3;
}

//iris flower data
export const useIrisFlowerData = ()=>{
  const [data2,setData2]=useState([])
  useEffect(()=>{

    const row = d =>{
      d.sepal_length = +d.sepal_length
      d.sepal_width = +d.sepal_width
      d.petal_length = +d.petal_length
      d.petal_width = +d.petal_width
      return d
    }
    csv(IrishFlowerUrl, row).then(setData2)
  },[])

  return data2;
}

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
