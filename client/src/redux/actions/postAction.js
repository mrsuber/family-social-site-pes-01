import {GLOBALTYPES} from './globlaTypes'
import {postDataAPI,getDataAPI,patchDataAPI} from '../../utils/fetchData'
import {imageUpload} from '../../utils/imageUpload'

export const POST_TYPES = {
  CREATE_POST : 'CREATE_POST',
  LOADING_POST:'LOADING_POST',
  GET_POSTS:'GET_POSTS',
  UPDATE_POST:'UPDATE_POST',
  GET_POST:'GET_POST'
}

export const createPost =({content, images, auth}) => async (dispatch)=>{
  let media = []
  try{
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})

    if(images.length > 0){
      media = await imageUpload(images)
      // media = "someImage.jpg"
    }
    const res = await postDataAPI('posts',{content,images:media},auth.token)

    dispatch({
      type:POST_TYPES.CREATE_POST,
      payload:{...res.data.newPost, user:auth.user}
    })
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
  }catch(err){

    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{error:err.response.data.msg}
    })
  }
}

export const getPosts = (token) => async (dispatch)=>{
try{
  dispatch({type:POST_TYPES.LOADING_POST,payload:true})
  const res = await getDataAPI('posts',token)

  dispatch({
    type:POST_TYPES.GET_POSTS,
    payload:res.data
  })
    dispatch({type:POST_TYPES.LOADING_POST,payload:false})

}catch(err){
  console.log(err)
  dispatch({
    type:GLOBALTYPES.ALERT,
    payload:{error:err.response.data.msg}
  })

}
}



export const updatePost =({content, images, auth, status}) => async (dispatch)=>{
  let media = []
  const imgNewUrl = images.filter(img => !img.url)
  const imgOldUrl = images.filter(img => img.url)

  console.log({imgNewUrl,imgOldUrl})
  if(status.content === content && imgNewUrl.length===0 && imgOldUrl.length === status.images.length)return
  try{
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)


    const res = await patchDataAPI(`posts/${status._id}`,{
      content,images:[...imgOldUrl, ...media]
    },auth.token)


    dispatch({type:POST_TYPES.UPDATE_POST,payload:res.data.newPost})
    dispatch({type:GLOBALTYPES.ALERT,payload:{success:res.data.msg}})
  }catch(err){

    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{error:err.response.data.msg}
    })
  }
}

export const likePost = ({auth,post}) => async (dispatch) =>{

  const newPost = {...post,likes:[...post.likes, auth.user]}

  dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
  try{

    await patchDataAPI(`post/${post._id}/like`,{},auth.token)
  }catch(err){
    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{error:err.response.data.msg}
    })
  }
}


export const unlikePost = ({auth,post}) => async (dispatch) =>{

  const newPost = {...post,likes:post.likes.filter(like => like._id !== auth.user._id)}

  dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})
  try{

    await patchDataAPI(`post/${post._id}/unlike`,{},auth.token)
  }catch(err){
    dispatch({
      type:GLOBALTYPES.ALERT,
      payload:{error:err.response.data.msg}
    })
  }
}

export const getPost = ({detailPost, id,auth}) => async (dispatch) =>{
  if(detailPost.every(post=>post._id !== id)){
    try{
      const res = await getDataAPI(`post/${id}`,auth.token)
      dispatch({type:POST_TYPES.GET_POST, payload:res.data.post})
    }catch(err){
      dispatch({type:GLOBALTYPES.ALERT, payload:{error:err.response.data.msg}
      })
    }
  }

}
