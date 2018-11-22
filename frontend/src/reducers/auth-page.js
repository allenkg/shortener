import merge from 'xtend';
import createReducer from './create-reducer';
import {
  REQUEST_SUCCESS,
  CHANGE_EMAIL,
  CHANGE_PASSWORD, ALREADY_LOG_IN, REQUEST_FAILURE, LOGOUT
} from '../actions/auth-page';

const INITIAL_STATE = {
  authenticated: false,
  token: '',
  email: ''
};

export default createReducer({
  [REQUEST_SUCCESS]: (state, action) => merge(state, {
    authenticated: true,
    token: action.auth_token
  }),
  [REQUEST_FAILURE]: (state) => merge(state, {
    authenticated: false,
    token: ''
  }),
  [ALREADY_LOG_IN]: (state) => merge(state, {
    authenticated: true,
  }),
  [CHANGE_EMAIL]: (state, action) => merge(state, {
    email: action.email
  }),
  [CHANGE_PASSWORD]: (state, action) => merge(state, {
    password: action.password
  }),
  [LOGOUT]: (state) => merge(state, {
    authenticated: false
  }),
}, INITIAL_STATE)