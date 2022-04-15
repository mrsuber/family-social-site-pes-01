import {SCHOOL_TYPES} from '../actions/schoolAction'

const initialState = {
  loading:false,
  schools:[]
}



const suggestionsReducer = (state = initialState, action) => {
  switch (action.type){
    case SCHOOL_TYPES.LOADING:
      return {
        ...state,
        loading:action.payload
      };
      case SCHOOL_TYPES.GET_SCHOOLS:
      
        return {
          ...state,
          schools:action.payload
        };
    default:
      return state;
  }
}

export default suggestionsReducer
