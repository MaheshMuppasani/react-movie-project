import { REVIEWS_FETCH_FAILURE, REVIEWS_FETCH_SUCCESS } from "./reviews.actions";
import 'lodash';

const initialState = {
  data: [],
  error: null,
  MPAA_options: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        MPAA_options: _.uniq(action.payload.map(review => review.mpaa_rating))
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
