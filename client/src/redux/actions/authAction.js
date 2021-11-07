import {postDataAPI} from '../../utils/fetchData'

export const TYPES = {
  AUTH:"AUTH"
}

export const login = (data) => async (dispatch)=>{
  try{
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    dispatch({type:'NOTIFY',payload:{loading:true}})
    const res = await postDataAPI('auth/login',data,config)
    dispatch({
      type:'AUTH',
      payload:{
        token:res.data.token,
        user:res.data.user
      }

    })
    localStorage.setItem("authToken",data.token)
    localStorage.setItem("firstLogin",true)
    dispatch({
      type:'NOTIFY',
      payload:{success:res.data.msg}
    })



  }catch(err){
      dispatch({
        type:'NOTIFY',
        payload:{error:err.response.data}
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
    dispatch({type:'NOTIFY',payload:{loading:true}})
    const res = await postDataAPI('auth/register',data,config)
    dispatch({
      type:'AUTH',
      payload:{
        token:res.data.token,
        user:res.data.user
      }

    })
    localStorage.setItem("authToken",data.token)
    localStorage.setItem("firstLogin",true)
    dispatch({
      type:'NOTIFY',
      payload:{success:res.data.msg}
    })



  }catch(err){
      dispatch({
        type:'NOTIFY',
        payload:{error:err.response.data}
      })
      }

}
