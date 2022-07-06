import React, {useReducer, createContext} from 'react'


const initialState = {
  monthIndex:0,
  setMonthIndex:(index)=>{},
  smallCalenderMonth:0,
  setSmallCalenderMonth:(index)=>{},
  daySelected:null,
  setDaySelected:(day) =>{}
}
const GlobalContext = createContext(initialState)

export default GlobalContext
