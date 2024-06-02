import { REVIEWS_FETCH_FAILURE, REVIEWS_FETCH_SUCCESS } from "./reviews.actions"

const initialState = {
  data: [],
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }
    case REVIEWS_FETCH_FAILURE:
      return {
        ...state,
        data: [],
        error: action.error
      }
    default:
      return state
  }
}
