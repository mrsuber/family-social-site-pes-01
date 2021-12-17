import {GLOBALTYPES} from './globlaTypes'
import {getDataAPI} from '../../utils/fetchData'

export const DISCOVER_TYPES = {
   LOADING: 'LOADING_DISCOVER',
   GET_POST: 'GET_DISCOVER_POST',
   UPDATE_POST:'UPDATE_DISCOVER_POSTS'
}

export const getDiscoverposts = (token) => async (dispatch) =>{

  try{

    dispatch({type:DISCOVER_TYPES.LOADING, payload:true})
    const res = await getDataAPI('post_discover',token)
    console.log(res)
    dispatch({type:DISCOVER_TYPES.LOADING, payload:false})

  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT, payload: {error:err.response.data.msg}})
  }
}
