import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'
import {Loading,Toast} from '../../components'

const Alert = () => {
const {alert} =   useSelector(state => state)
const dispatch = useDispatch()
// console.log(notify.error)
  return (
    <div >

  {alert.loading && <Loading/>}
  {

    alert.error &&
    <Toast
    msg={{title:'Error',body:alert.error}}
    handleShow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
    bgColor="social2DangerColor"
    />}
    {
      alert.success &&
      <Toast
      msg={{title:'Success',body:alert.success}}
      handleShow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
      bgColor="social2SuccessColor"
      />}


    </div>
  )
}

export default Alert
