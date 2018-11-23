import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import mainPage from './main-page';
import authPage from './auth-page';
import registerPage from './registration-page';
import adminPage from './admin-page';

export default combineReducers({
  routing,
  mainPage,
  authPage,
  registerPage,
  adminPage
})