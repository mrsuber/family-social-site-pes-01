import React from 'react'
import './SelectFamilyCard.css'
import {FAMILY_TYPES} from '../../../redux/actions/familyAction'
import {useSelector,useDispatch} from 'react-redux'


const SelectFamilyCard = () => {
  const {family} = useSelector(state=>state)
  const dispatch = useDispatch()

  return (
    <div className="social2__select_family_card_wrapper">

    <div className="social2__select_family_card">

    <div className="social2__family_modal_header">
      <h5 className="social2__family_modal_title">Select Family Obtion</h5>
      <span onClick={() => dispatch({type:FAMILY_TYPES.SELECT_FAMILY, payload:false})}>&times;</span>
    </div>
      <form>form for select family</form>
      <form>form for join a family</form>
      <form>form for create family</form>
    </div>


    </div>
  )
}

export default SelectFamilyCard
