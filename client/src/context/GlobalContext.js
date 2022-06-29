import React, {useReducer, createContext} from 'react'


const initialState = {
  monthIndex:0,
  setMonthIndex:(index)=>{}
}
const GlobalContext = createContext(initialState)

export default GlobalContext
