import React , {useState,useRef, useEffect} from 'react'
import './StatusModal.css'
import { useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {CameraAlt,Image} from '@material-ui/icons'
import {createPost,updatePost} from '../../../redux/actions/postAction'

const StatusModal = () => {
  const {auth,theme,status} = useSelector(state => state)
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [images,setImages] = useState([])
  const [stream, setStream]= useState(false)
  const videoRef = useRef()
  const refCanvas = useRef()
  const [tracks, setTracks] = useState('')


  const handleChangeImages = e =>{
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach(file =>{
      if(!file) return err="File does not exist."
      if(file.type !== 'image/jpeg' && file.type !== 'image/png'   ){
        return err = "Image format is incorrect."
      }

      return newImages.push(file)

    })
    if(err)dispatch({ type:GLOBALTYPES.ALERT,payload:{error:err} })
    setImages([...images, ...newImages])
  }

  const deleteImages =(index)=>{
    console.log(index)
    const newArr = [...images]
    newArr.splice(index,1)
    setImages(newArr)
  }

  const handleStream = ()=>{
    setStream(true)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({video:true})
      .then(mediaStream =>{
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
        const track = mediaStream.getTracks()
        setTracks(track[0])
      }).catch(err => console.log(err))
    }
  }

  const handleCapture =()=>{
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    refCanvas.current.setAttribute("width",width)
    refCanvas.current.setAttribute("height",height)
    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([...images,{camera: URL}])
  }

  const handleStopStream = ()=> {
    tracks.stop()
    setStream(false)
  }

const handleSubmit = (e) =>{
  e.preventDefault()
  if(images.length === 0){
    return dispatch({type:GLOBALTYPES.ALERT, payload:{error:"Please add your photo"}})
  }
  if(status.onEdit){
    dispatch(updatePost({content, images, auth, status}))
  }else{
    dispatch(createPost({content, images, auth}))
  }

  setContent('')
  setImages([])
  if(tracks) tracks.stop()
  dispatch({type:GLOBALTYPES.STATUS,payload:false})
}

useEffect(()=>{
  if(status.onEdit){
    setContent(status.content)
    setImages(status.images)
  }
},[status])

  return (
    <div className="social2__status_modal_wrapper">
      <form onSubmit={handleSubmit}>
          <div className="social2__status_modal_header">
            <h5 className="social2__status_modal_title">Create Post</h5>
            <span onClick={() => dispatch({type:GLOBALTYPES.STATUS, payload:false})}>&times;</span>
          </div>

          <div className="social2__status_modal_body">
            <textarea name="content" value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={e =>setContent(e.target.value)}/>

            <div className="social2__status_modal_show_images">
              {
                images.map((img, index) =>(
                  <div key={index} id="file_img">
                      <img src={
                        img.camera
                        ? img.camera
                        : img.url? img.url : URL.createObjectURL(img)
                      } alt="images" className="social2__status_modal_img_thumbnail"/>
                      <span  onClick={()=>deleteImages(index)}>&times;</span>
                  </div>
                ))
              }
            </div>

            {
              stream &&
              <div className="social2__status_modal_steam">
                  <video autoplay muted ref={videoRef} width="100%" height="100%"/>
                  <span onClick={handleStopStream}>&times;</span>
                  <canvas ref={refCanvas} style={{display:'none'}}/>
              </div>
            }

            <div className="socail2__status_modal_input_images">
            {
              stream
              ?<CameraAlt onClick={handleCapture}/>
              :<>
              <CameraAlt onClick={handleStream}/>
              <div className="socail2__status_modal_file_upload">
              <Image/>
              <input type="file" name="file" id="file" multiple accept="image/*" onChange={handleChangeImages}/>
              </div>
              </>
            }

            </div>
          </div>

          <div className="social2__status_modal_footer">
            <button className="social2__status_modal_footer_btn" type="submit">
            Post
            </button>
          </div>

      </form>
    </div>
  )
}

export default StatusModal
