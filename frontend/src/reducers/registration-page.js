import merge from 'xtend';
import createReducer from './create-reducer';
import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  REQUEST_REGISTRATION_SUCCESS,
  CHANGE_PASSWORD_CONFIRMATION
} from "../actions/registration-page";

const INITIAL_STATE = {
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
};

export default createReducer({
  [CHANGE_EMAIL]: (state, action) => merge(state, {
    email: action.email
  }),
  [CHANGE_NAME]: (state, action) => merge(state, {
    name: action.name
  }),
  [CHANGE_PASSWORD]: (state, action) => merge(state, {
    password: action.password
  }),
  [CHANGE_PASSWORD_CONFIRMATION]: (state, action) => merge(state, {
    confirmPassword: action.confPass
  }),
}, INITIAL_STATE)