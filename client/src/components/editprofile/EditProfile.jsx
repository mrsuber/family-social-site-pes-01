import React,{useState,useEffect} from 'react'
import './EditProfile.css'
import {useSelector , useDispatch} from 'react-redux'
import {CameraAlt} from '@material-ui/icons'
import {checkImage} from '../../utils/imageUpload'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'
import {updateProfileUser} from '../../redux/actions/profileAction'

const EditProfile = ({setOnEdit}) => {
  const initState = {
    fullname:'',
    mobile:'',
    address:'',
    website:'',
    story:'',
    gender:''
  }
  const [userData,setUserData] = useState(initState)
  const {fullname,mobile,address,website,story,gender} = userData

  const [profilePic,setProfilePic] = useState('')

  const {auth,theme} = useSelector(state=>state)
  const dispatch = useDispatch()

  const changeProfilePic =(e)=>{
    const file = e.target.files[0]
    const err = checkImage(file)
    if(err){
      return dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
    }
    setProfilePic(file)
  }
  const handleInput = e =>{
    const {name, value} = e.target
    setUserData({...userData,[name]:value})
  }

  const handleSubmit = e =>{
    e.preventDefault()

    dispatch(updateProfileUser({userData,profilePic,auth}))

  }

  useEffect(()=>{
    setUserData(auth.user)
  },[auth.user])
  return (
    <div className="social2__edit_profile">
    <button className="social2__btn_edit_close" onClick={()=>setOnEdit(false)}>
    Close
    </button>

    <form onSubmit={handleSubmit}>
      <div className="social2__info_avatar">
        <img src={profilePic? URL.createObjectURL(profilePic) : auth.user.profilePic} alt="profilePic"  style={{filter:theme? 'invert(1)' : 'invert(0)'}}/>
        <span>
          <CameraAlt />
          <p>Change</p>
          <input type="file" name="file" id="file_up" accept="image/*" onChange={changeProfilePic}/>
        </span>
      </div>

      <div className="social2__form_group">
        <label htmlFor="fullname">Full Name</label>
        <div className="social2__form_input_wrapper">
         <input type="text" className="social2__form_control" id="fullname" name="fullname" value={fullname } onChange={handleInput}/>
         <small className="social2__form_small_text">{fullname? fullname.length : 0}/25</small>
         </div>

         <div className="social2__form_group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" value={mobile} className="social2__form_control"  onChange={handleInput}/>
         </div>

         <div className="social2__form_group">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" value={address} className="social2__form_control"  onChange={handleInput}/>
         </div>

         <div className="social2__form_group">
          <label htmlFor="website">Website</label>
          <input type="text" name="website" value={website} className="social2__form_control"  onChange={handleInput}/>
         </div>

         <div className="social2__form_group">
          <label htmlFor="story">Story</label>
          <textarea  name="story" value={story} className="social2__form_control"  onChange={handleInput} cols="30" rows="4"/>
          <small className="social2__form_small_story_text">{story.length}/200</small>

         </div>
         <label htmlFor="gender">Gender</label>
         <div className="social2__gender">
          <select name="gender" id="gender" className="social2__gender_select"value={gender} onChange={handleInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
         </div>
      </div>

      <button className="social2__edit_save_btn" type="submit">Save</button>
    </form>
    </div>
  )
}

export default EditProfile
