import {GLOBALTYPES} from './globlaTypes'
import { getDataAPI} from '../../utils/fetchData'
import {imageUpload} from '../../utils/imageUpload'

export const PROFILE_TYPES = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER'
}


export const getProfileUsers =  ({users,id,auth}) => async (dispatch)=>{


if(users.every(user=>user._id !==id)){
  try{
    dispatch({type:PROFILE_TYPES.LOADING,payload:true})
     const res = await  getDataAPI( `/user/${id}`,auth.token)
     dispatch({type:PROFILE_TYPES.GET_USER, payload:res.data})
     dispatch({type:PROFILE_TYPES.LOADING,payload:false})

  }
catch(err){
      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{error:err.response.data.msg}})
  }



}

}

export const updateProfileUser = ({userData,profilePic}) =>async(dispatch)=>{


  if(!userData.fullname){
    return dispatch({type:GLOBALTYPES.ALERT, payload:{error:"Please add your full name"}})
  }

  if(userData.fullname.length >25){
    return dispatch({type:GLOBALTYPES.ALERT, payload:{error:"Your full name is too long"}})
  }

  if(userData.story.length >200){
    return dispatch({type:GLOBALTYPES.ALERT, payload:{error:"Your story is too long"}})
  }
  if(profilePic) {

        let media;

    try{
      dispatch({type:GLOBALTYPES.ALERT, payload:{loading:true}})
    media= await imageUpload([profilePic])

    dispatch({type:GLOBALTYPES.ALERT, payload:{loading:false}})
      }
    catch(err){
          dispatch({
            type:GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}})
      }
  }
}
