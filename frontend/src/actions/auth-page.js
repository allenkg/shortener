import {post} from "../api";
import {push} from 'react-router-redux';

export const REQUEST = 'LOGIN_PAGE/REQUEST';
export const REQUEST_SUCCESS = 'LOGIN_PAGE/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'LOGIN_PAGE/REQUEST_FAILURE';
export const CHANGE_EMAIL = 'LOGIN_PAGE/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'LOGIN_PAGE/CHANGE_PASSWORD';
export const LOGOUT = 'LOGIN_PAGE/LOGOUT';
export const ALREADY_LOG_IN = 'LOGIN_PAGE/ALREADY_LOG_IN';

function changeEmail(email) {
  return {type: CHANGE_EMAIL, email}
}

function changePassword(password) {
  return {type: CHANGE_PASSWORD, password}
}

function login() {
  return (dispatch, getState) => {
    dispatch({type: REQUEST});
    const {email, password} = getState().authPage;

    return post('/api/auth/login', {email, password}).then((response) => {
      const {auth_token, user} = response;
      dispatch({type: REQUEST_SUCCESS, auth_token});
      localStorage.setItem('token', auth_token);
      localStorage.setItem('user_name', user.name);
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('admin', user.staff);
      localStorage.setItem('authenticated', true);
      dispatch(push('/'));
    }).catch((errors) => {
      dispatch({type: REQUEST_FAILURE, errors});
      dispatch(push('/'));
    })
  }
}

function alreadyLogIn() {
  return { type: ALREADY_LOG_IN }
}

function logout() {
  return {type: LOGOUT}
}

export default {
  changeEmail,
  changePassword,
  login,
  logout,
  alreadyLogIn
}

