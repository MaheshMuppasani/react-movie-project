import { combineEpics, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import {
  CRITICS_FETCH_REQUEST,
  CRITICS_FETCH_SUCCESS,
  CRITICS_FETCH_FAILURE,
} from './critics.actions';


const fetchCritics = (action$, state$, { get }) =>
  action$.pipe(
    ofType(CRITICS_FETCH_REQUEST),
    mergeMap(() =>
      from(get('/static/critics.json')).pipe(
        map(response => {
          let payload = response.data
          return {
            type: CRITICS_FETCH_SUCCESS,
            payload,
            meta: response.data.meta,
          }
        }),
        catchError(error => {
          console.error(error)
          return of({ type: CRITICS_FETCH_FAILURE, error })
        })
      )
    )
  )

export default combineEpics(fetchCritics)
