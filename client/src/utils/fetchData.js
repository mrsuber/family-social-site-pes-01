import axios from 'axios'

export const getDataAPI = async (url,token) =>{
  const config = {
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
  }
  const res = await axios.get(`/api/${url}`,config)

  return res;
}


export const postDataAPI = async (url,data,config) =>{

  const res = await axios.post(`/api/${url}`,data,config)

  return res;
}

export const putDataAPI = async (url,post) =>{
  const config = {
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
  }
  const res = await axios.put(`/api/${url}`,post,config)

  return res;
}


export const patchDataAPI = async (url,post) =>{
  const config = {
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
  }
  const res = await axios.patch(`/api/${url}`,post,config)

  return res;
}


export const deleteDataAPI = async (url) =>{
  const config = {
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
  }
  const res = await axios.delete(`/api/${url}`,config)

  return res;
}
