import {postDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from './globlaTypes'
import valid from '../../utils/valid'


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
    // localStorage.setItem("authToken",res.data.token)
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
    const check = valid(data)
    if(check.errLength > 0){

      return dispatch({type:GLOBALTYPES.ALERT,payload:check.errMsg})
    }
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    const res = await postDataAPI('auth/register',{data},config)
    dispatch({
      type:GLOBALTYPES.AUTH,
      payload:{
        token:res.data.token,
        user:res.data.user
      }

    })
    // localStorage.setItem("authToken",res.data.token)
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

export const logout = () => async (dispatch) =>{
  try{
    localStorage.removeItem('firstLogin')
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    await postDataAPI('auth/logout',config)
    window.location.href ="/"
  }catch(err){

      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{
          error:err.response.data.msg
        }
      })
  }
}
