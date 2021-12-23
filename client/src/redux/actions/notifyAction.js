import {GLOBALTYPES} from './globlaTypes'

import {postDataAPI, deleteDataAPI, getDataAPI} from '../../utils/fetchData'

export const NOTIFY_TYPES = {
  GET_NOTIFIES:'GET_NOTIFIES',
}

export const createNotify = ({msg,auth,socket}) => async (dispatch) =>{


  try{
    const res = await postDataAPI('notify', msg, auth.token)
    console.log("notify",res)
  }catch(err){
  dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
  }
}

export const removeNotify = ({msg,auth,socket}) => async (dispatch) =>{

  try{
    const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
    console.log("delete notify",res)
  }catch(err){
  dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})
  }
}

export const getNotifies = (token) => async (dispatch) =>{
  try{
    const res = await getDataAPI('notifies', token)
    console.log("thes is the get notifies", res)
    dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies})
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}})

  }
}
