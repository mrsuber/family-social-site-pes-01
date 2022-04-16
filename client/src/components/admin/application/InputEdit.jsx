import React,{useState,useEffect} from 'react'
import './styles.css'
import {useSelector , useDispatch} from 'react-redux'
import {CameraAlt} from '@material-ui/icons'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {checkImage} from '../../../utils/imageUpload'

const InputEdit = ({setOnEdit,onEdit=true}) => {

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
      <div className="social2__edit_profile">
      <button className="social2__btn_edit_close" onClick={()=>setOnEdit(false)}>
      Close
      </button>

      <form onSubmit={handleSubmit}>


        <div className="social2__form_group">
          <label htmlFor="fullname">Full Name</label>
          <div className="social2__form_input_wrapper">
           <input type="text" className="social2__form_control" id="fullname" name="fullname" value={fullname } onChange={handleInput}/>

           </div>

          </div>

        <button className="social2__edit_save_btn" type="submit">Save</button>
      </form>
      </div>
      </>
    }</>

  )
}

export default InputEdit
