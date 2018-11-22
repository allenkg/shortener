import { get, post, remove } from "../api"

export const FETCH_DATA = 'MAIN_PAGE/FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'MAIN_PAGE/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'MAIN_PAGE/FETCH_DATA_FAILURE';

export const CHANGE_ORIGINAL_LINK = 'MAIN_PAGE/CHANGE_ORIGINAL_LINK';
export const SHORT_LINK_CHANGE = 'MAIN_PAGE/SHORT_LINK_CHANGE';
export const TRANSFORM_LINK = 'MAIN_PAGE/TRANSFORM_LINK';
export const TRANSFORM_LINK_SUCCESS = 'MAIN_PAGE/TRANSFORM_LINK_SUCCESS';
export const TRANSFORM_LINK_FAILURE = 'MAIN_PAGE/TRANSFORM_LINK_FAILURE';

export const DELETE_LINK = 'MAIN_PAGE/DELETE_LINK';
export const DELETE_LINK_SUCCESS = 'MAIN_PAGE/DELETE_LINK_SUCCESS';
export const DELETE_LINK_FAILURE = 'MAIN_PAGE/DELETE_LINK_FAILURE';

export const REDIRECT_TO = 'MAIN_PAGE/REDIRECT_TO';
export const SET_TRACKER_INITIAL_STATE = 'MAIN_PAGE/SET_TRACKER_INITIAL_STATE';

export const SET_TRACKER = 'MAIN_PAGE/SET_TRACKER';
export const SET_TRACKER_FAILURE = 'MAIN_PAGE/SET_TRACKER_FAILURE';

const url = '/api/links';

function fetchUrls() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch({ type: FETCH_DATA });

    return get(url, token)
      .then((data) => {
        dispatch({ type: FETCH_DATA_SUCCESS, data });
      })
      .catch((errors) => dispatch({ type: FETCH_DATA_FAILURE, errors }))

  }
}

function changeOriginalLink(link) {
  return { type: CHANGE_ORIGINAL_LINK, link }
}

function shortLinkChange(link) {
  return { type: SHORT_LINK_CHANGE, link }
}

function convertToShortLink() {
  return (dispatch, getState) => {
    dispatch({ type: TRANSFORM_LINK });
    const { originalLink } = getState().mainPage;
    const token = localStorage.getItem('token');
    const payload = {
      orig_link: originalLink
    };
    return post(url, payload, token)
      .then((data) => {
        dispatch({ type: TRANSFORM_LINK_SUCCESS, data })
      })
      .catch((errors) => {
        dispatch({ type: TRANSFORM_LINK_FAILURE, errors });
      })
  }
}

function redirectTo(currentLinkObject) {
  localStorage.setItem('link_id', currentLinkObject.id);
  return { type: REDIRECT_TO, currentLinkObject }
}

function setTrackerInitialState() {
  return { type: SET_TRACKER_INITIAL_STATE }
}

function setTracker(id) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch({ type: SET_TRACKER });
    return get(`/api/link_proceeds/${id}`, token)
      .then((response) => {
        window.location.replace(response.redirect_link)
      })
      .catch((errors) => dispatch({ type: SET_TRACKER_FAILURE, errors }))
  }
}

function deleteLink(linkId) {
  return (dispatch) => {
    dispatch({ type: DELETE_LINK });
    const token = localStorage.getItem('token');

    return remove(`${url}/${linkId}`, token)
      .then(() => {
        dispatch({ type: DELETE_LINK_SUCCESS })
      })
      .catch((errors) => {
        dispatch({ type: DELETE_LINK_FAILURE, errors });
      })
  }
}

export default {
  fetchUrls,
  changeOriginalLink,
  convertToShortLink,
  redirectTo,
  deleteLink,
  setTracker,
  setTrackerInitialState,
  shortLinkChange
}