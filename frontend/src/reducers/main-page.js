import merge from 'xtend';
import createReducer from './create-reducer';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  CHANGE_ORIGINAL_LINK,
  TRANSFORM_LINK,
  TRANSFORM_LINK_SUCCESS,
  TRANSFORM_LINK_FAILURE,
  DELETE_LINK_SUCCESS, REDIRECT_TO, SET_TRACKER_INITIAL_STATE, SHORT_LINK_CHANGE
} from '../actions/main-page';

import { LOGOUT } from "../actions/auth-page";

const INITIAL_STATE = {
  data: [],
  userURLs: [],
  originalLink: '',
  shortLink: '',
  isLoading: false,
  linkId: null,
  linkObject: {}
};

function getUserShortURLs(data) {
  const userId = localStorage.getItem('user_id');
  return data.reduce((acc, item) => {
    if (item.user_id == userId)
      acc.push(item);
    return acc
  }, []);
}

export default createReducer({
  [FETCH_DATA]: (state) => merge(state, { isLoading: true }),
  [FETCH_DATA_SUCCESS]: (state, action) => merge(state, {
    data: action.data,
    userURLs: getUserShortURLs(action.data),
    isLoading: false
  }),
  [CHANGE_ORIGINAL_LINK]: (state, action) => merge(state, {
    originalLink: action.link
  }),
  [SHORT_LINK_CHANGE]: (state, action) => merge(state, {
    shortLink: action.link
  }),
  [TRANSFORM_LINK]: (state, action) => merge(state, {
    isLoading: true
  }),
  [TRANSFORM_LINK_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    shortLink: action.data.short_link,
    originalLink: action.data.orig_link,
    linkId: action.data.id,
    data: state.data.concat([action.data]),
    userURLs: state.userURLs.concat([action.data])
  }),
  [TRANSFORM_LINK_FAILURE]: (state, action) => merge(state, {
    isLoading: false,
    shortLink: '',
    originalLink: '',
    errors: action.errors,
    linkId: null
  }),
  [DELETE_LINK_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    shortLink: '',
    originalLink: '',
    errors: action.errors,
    data: state.data.slice(0,-1),
    userURLs: state.userURLs.slice(0,-1),
    linkId: null
  }),
  [REDIRECT_TO]: (state, action) => merge(state, {
    linkObject: action.currentLinkObject
  }),
  [SET_TRACKER_INITIAL_STATE]: (state) => merge(state, {
    linkObject: {}
  }),
  [LOGOUT]: (state) => merge(state, INITIAL_STATE)
}, INITIAL_STATE)