import React , {useState} from 'react'
import './StatusModal.css'
import { useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {CameraAlt,Image} from '@material-ui/icons'

const StatusModal = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  return (
    <div className="social2__status_modal_wrapper">
      <form>
          <div className="social2__status_modal_header">
            <h5 className="social2__status_modal_title">Create Post</h5>
            <span onClick={() => dispatch({type:GLOBALTYPES.STATUS, payload:false})}>&times;</span>
          </div>

          <div className="social2__status_modal_body">
            <textarea name="content" value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={e =>setContent(e.target.value)}/>

            <div className="socail2__status_modal_input_images">
              <CameraAlt/>
              <div className="socail2__status_modal_file_upload">
              <Image/>
              <input type="file" name="file" id="file" multiple accept="image/*"/>
              </div>
            </div>
          </div>

          <div className="social2__status_modal_footer">
            <button className="social2__status_modal_footer_btn">Post</button>
          </div>

      </form>
    </div>
  )
}

export default StatusModal
