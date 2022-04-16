import React,{useState,useEffect} from 'react'
import './inputEdit.css'
import {useSelector , useDispatch} from 'react-redux'
import {CameraAlt} from '@material-ui/icons'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {checkImage} from '../../../utils/imageUpload'

const InputEdit = ({setOnEdit,onEdit=false}) => {

  const initState = {
    fullname:'',

  }
  const [userData,setUserData] = useState(initState)
  const {fullname} = userData



  const handleInput = e =>{
    const {name, value} = e.target
    setUserData({...userData,[name]:value})
  }


  const handleSubmit = e =>{
    e.preventDefault()

    // dispatch(updateProfileUser({userData,profilePic,auth}))

  }

  return (
    <>{
      onEdit===false
      ? <></>
      : <>
      <div className="InputWrapper__edit_profile">
      <div className="input__form_input_wrapper">
      <button className="Input_edit_close" onClick={()=>setOnEdit(false)}>
      Close
      </button>

      <form onSubmit={handleSubmit} >


        <div className="social2__form_group">
          <label htmlFor="fullname">Full Name</label>
          <div >
           <input type="text" className="input__form_control" id="fullname" name="fullname" value={fullname } onChange={handleInput}/>

           </div>

          </div>

        <button className="input__edit_save_btn" type="submit">Update</button>
      </form>
      </div>
      </div>
      </>
    }</>

  )
}

export default InputEdit
