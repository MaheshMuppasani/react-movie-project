import { CRITICS_FETCH_FAILURE, CRITICS_FETCH_SUCCESS } from "./critics.actions";
import 'lodash';

const initialState = {
  data: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CRITICS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case CRITICS_FETCH_FAILURE:
      return {
        ...state,
        data: [],
        error: action.error
      }
    default:
      return state
  }
}
