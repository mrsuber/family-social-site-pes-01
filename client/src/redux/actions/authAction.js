import {postDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from './globlaTypes'


export const login = (data) => async (dispatch)=>{
  try{
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    const res = await postDataAPI('auth/login',data,config)
    dispatch({
      type:GLOBALTYPES.AUTH,
      payload:{
        token:res.data.token,
        user:res.data.user
      }

    })

    localStorage.setItem("firstLogin",true)
    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{success:res.data.msg}
    })
  }catch(err){

      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{error:err.response.data.msg}
      })
      }

}


export const register = (data) => async (dispatch)=>{
  try{
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    const res = await postDataAPI('auth/register',data,config)
    dispatch({
      type:GLOBALTYPES.AUTH,
      payload:{
        token:res.data.token,
        user:res.data.user
      }

    })
    localStorage.setItem("authToken",data.token)
    localStorage.setItem("firstLogin",true)
    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{success:res.data.msg}
    })



  }catch(err){
      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{error:err.response.data}
      })
      }

}

export const refreshToken = () => async (dispatch)=>{
  const firstLogin = localStorage.getItem("firstLogin")

  if(firstLogin){
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    try{
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }

      const res= await postDataAPI('auth/refresh_token',config)
      dispatch({
        type:GLOBALTYPES.AUTH,
        payload:{
          token:res.data.token,
          user:res.data.user
        }

      })
      dispatch({type:GLOBALTYPES.ALERT, payload:{} })
    }catch(err){
      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{
          error:err.response.data.msg
        }
      })
    }
  }
}
