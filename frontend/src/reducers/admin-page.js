import merge from 'xtend';
import createReducer from './create-reducer';
import {
  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS,
  FETCH_RECORDS_FAILURE, CHANGE_SEARCH_QUERY, REFRESH_REPORT_DATA, CHANGE_PAGE_NUMBER, CHANGE_OFFSET
} from '../actions/admin-page';

const INITIAL_STATE = {
  trackers: [],
  trackersLoading: false,
  pageNumber: 1,
  totalPages: 3,
  startId: 1,
  offset: 0,
  perPage: 5,
  errors: '',
  searchQuery: ''
};

export default createReducer({
  [FETCH_RECORDS]: (state, action) => merge(state, {
    trackersLoading: true
  }),
  [FETCH_RECORDS_SUCCESS]: (state, action) => merge(state, {
    trackers: action.data,
    trackersLoading: false
  }),
  [REFRESH_REPORT_DATA]: (state, action) => merge(state, {
    trackers: [],
    trackersLoading: true,
    startId: 1,
    totalPages: 3,
    searchQuery: '',
    offset: 0
  }),
  [FETCH_RECORDS_FAILURE]: (state, action) => merge(state, {
    trackers: [],
    trackersLoading: false,
    errors: action.error
  }),
  [CHANGE_SEARCH_QUERY]: (state, action) => merge(state, {
    searchQuery: action.query
  }),
  [CHANGE_PAGE_NUMBER]: (state, action) => merge(state, {
    pageNumber: action.number
  }),
  [CHANGE_OFFSET]: (state, action) => merge(state, {
    offset: action.number
  })
}, INITIAL_STATE)