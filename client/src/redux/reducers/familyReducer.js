import {FAMILY_TYPES} from '../actions/familyAction'

const initialState = {

  selectFamily:false
}

const familyReducer = (state = initialState, action) =>{
  switch (action.type){
    case FAMILY_TYPES.SELECT_FAMILY:
      return {selectFamily:action.payload}
    default:
        return state;
  }
}

export default familyReducer
