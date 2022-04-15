import {GLOBALTYPES} from '../actions/globlaTypes'
import {getDataAPI} from '../../utils/fetchData'

export const SCHOOL_TYPES = {
  LOADING: 'LOADING_SCHOOLS',
  GET_SCHOOLS: 'GET_ALL_SCHOOLS'
}

export const getSchools = (token) =>async(dispatch)=>{
  try{
    dispatch({type:SCHOOL_TYPES.LOADING, payload:true})

    const res = await getDataAPI('school',token)
    // console.log("schoolres",res.data.schools)
    dispatch({type:SCHOOL_TYPES.GET_SCHOOLS, payload:res.data.schools})

    dispatch({type:SCHOOL_TYPES.LOADING, payload:false})
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
  }
}
