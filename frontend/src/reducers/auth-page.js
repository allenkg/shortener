import merge from 'xtend';
import createReducer from './create-reducer';
import {
  REQUEST_SUCCESS,
  CHANGE_EMAIL,
  CHANGE_PASSWORD
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
  [CHANGE_EMAIL]: (state, action) => merge(state, {
    email: action.email
  }),
  [CHANGE_PASSWORD]: (state, action) => merge(state, {
    password: action.password
  }),
}, INITIAL_STATE)