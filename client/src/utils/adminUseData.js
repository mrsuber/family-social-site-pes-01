import {useEffect,useState} from 'react'
import { csv,json } from 'd3'
import {feature,mesh} from 'topojson'

const CSSurl = "https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/CSS%20Named%20Colors%20-%20Sheet.csv"
const UN_pop_url="https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/population_2019_2020.csv"
// csv url


const IrishFlowerUrl ="https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv"
// data source https://gist.github.com/curran/a08a1080b88344b0c8a7#file-iris-csv
//csv url

const GlobalTempUrl = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv"
// source https://gist.github.com/curran/90240a6d88bdb1411467b21ea0769029
//csv url

const WorldMapUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
// Jason url

const PointsOnMap = "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"
//csvurs

const MissingMigrants = "https://raw.githubusercontent.com/mrsuber/SVG-css-colors/master/Missing_Migrants_Global_Figures_a.csv"
//csvUrl


//points on wordMapMig points data
export const useMigrandsMissPointsData = ()=>{
  const [data7,setData7]=useState([])

  const row = d=>{
    d.coords = d.Coordinates.split(",").map(d =>+d)
    d["Total Number of Dead and Missing"] = +d["Total, Number, of, Dead, and, Missing"]
    d['Incident Date'] = new Date(d['Incident, Date'])
    return d
  }
  useEffect(()=>{

    csv(MissingMigrants,row).then(setData7)


  },[])

  return data7;
}


//iris temperature data
export const useMigrandsData = ()=>{
  const [data6,setData6]=useState([])

  useEffect(()=>{

    const row = d =>{
      d['Total Number of Dead and Missing'] = +d['Total, Number, of, Dead, and, Missing']
      d['Incident Date'] = new Date(d['Incident, Date'])
      return d
    }
    csv(MissingMigrants, row).then(setData6)
  },[])

  return data6;
}

//points on wordMap data
export const usePointsOnMapData = ()=>{
  const [data5,setData5]=useState([])
  const row = d=>{
    d.lat = +d.lat
    d.lng = +d.lng
    d.population = +d.population
    return d
  }
  useEffect(()=>{

    csv(PointsOnMap,row).then(setData5)


  },[])

  return data5;
}


//iris wordMap data
export const useWorldMapData = ()=>{
  const [data4,setData4]=useState([])

  useEffect(()=>{

    json(WorldMapUrl).then(topology => {
      const {countries,land} = topology.objects;
      setData4({
        land: feature(topology, land),
        interiors: mesh(topology,countries,(a,b) => a !== b)
      })

    })
  },[])

  return data4;
}



//iris temperature data
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
