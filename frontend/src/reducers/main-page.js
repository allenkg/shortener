import merge from 'xtend';
import createReducer from './create-reducer';
import {
    FETCH_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    CHANGE_ORIGINAL_LINK,
    TRANSFORM_LINK,
    TRANSFORM_LINK_SUCCESS,
    TRANSFORM_LINK_FAILURE,
    DELETE_LINK_SUCCESS
} from '../actions/main-page';

const INITIAL_STATE = {
  data: [],
  originalLink: '',
  shortLink: '',
  isLoading: false,
  linkId: null
};

export default createReducer({
  [FETCH_DATA_SUCCESS]: (state, action) => merge(state, {
    data: action.data
  }),
  [CHANGE_ORIGINAL_LINK]: (state, action) => merge(state, {
    originalLink: action.link
  }),
  [TRANSFORM_LINK]: (state, action) => merge(state, {
    isLoading: true
  }),
  [TRANSFORM_LINK_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    shortLink: action.data.short_link,
    originalLink: action.data.orig_link,
    linkId: action.data.id
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
    linkId: null
  })
}, INITIAL_STATE)