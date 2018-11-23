import merge from 'xtend';
import createReducer from './create-reducer';
import {
  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS,
  FETCH_RECORDS_FAILURE
} from '../actions/admin-page';

const INITIAL_STATE = {
  trackers: [],
  trackersLoading: false,
  pageNumber: 1,
  totalPages: null
};


export default createReducer({
  [FETCH_RECORDS]: (state, action) => merge(state, {
    trackersLoading: true
  }),
  [FETCH_RECORDS_SUCCESS]: (state, action) => merge(state, {
    trackers: action.data,
    trackersLoading: false
  })
}, INITIAL_STATE)