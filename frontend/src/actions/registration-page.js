import {post} from "../api";
import {push} from 'react-router-redux';

import {REQUEST_SUCCESS} from "./auth-page";

export const CHANGE_NAME = 'REGISTRATION_PAGE/CHANGE_NAME';
export const CHANGE_EMAIL = 'REGISTRATION_PAGE/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'REGISTRATION_PAGE/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_CONFIRMATION = 'REGISTRATION_PAGE/CHANGE_PASSWORD_CONFIRMATION';
export const REQUEST_REGISTRATION = 'REGISTRATION_PAGE/REQUEST_REGISTRATION';
export const REQUEST_REGISTRATION_SUCCESS = 'EGISTRATION_PAGE/REQUEST_REGISTRATION_SUCCESS';
export const REQUEST_REGISTRATION_FAILURE = 'REGISTRATION_PAGE/REQUEST_REGISTRATION_FAILURE';

function changeName(name) {
  return {type: CHANGE_NAME, name}
}

function changeEmail(email) {
  return {type: CHANGE_EMAIL, email}
}

function changePassword(password) {
  return {type: CHANGE_PASSWORD, password}
}

function changePassConf(confPass) {
  return {type: CHANGE_PASSWORD_CONFIRMATION, confPass}
}

function register(admin) {
  return (dispatch, getState) => {
    dispatch({type: REQUEST_REGISTRATION});
    const {name, email, password, confirmPassword} = getState().registerPage;
    return post('/api/register', {name, email, password, password_confirmation: confirmPassword, staff: !!admin})
      .then((response) => {
        console.log('RESPONSE ===> ', response);
        const {auth_token, user} = response;

        dispatch({type: REQUEST_SUCCESS, auth_token});
        localStorage.setItem('token', auth_token);
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('admin', user.staff);
        localStorage.setItem('user_id', user.id);
        dispatch(push('/'));
        dispatch({type: REQUEST_REGISTRATION_SUCCESS})
      })
      .catch((errors) => {
        return {type: REQUEST_REGISTRATION_FAILURE, errors}
      })
  }
}

export default {
  changeName,
  changeEmail,
  changePassword,
  changePassConf,
  register
}