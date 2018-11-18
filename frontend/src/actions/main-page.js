import { get, post, remove} from "../api"

export const FETCH_DATA = 'MAIN_PAGE/FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'MAIN_PAGE/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'MAIN_PAGE/FETCH_DATA_FAILURE';

export const CHANGE_ORIGINAL_LINK = 'MAIN_PAGE/CHANGE_ORIGINAL_LINK';
export const TRANSFORM_LINK = 'MAIN_PAGE/TRANSFORM_LINK';
export const TRANSFORM_LINK_SUCCESS = 'MAIN_PAGE/TRANSFORM_LINK_SUCCESS';
export const TRANSFORM_LINK_FAILURE = 'MAIN_PAGE/TRANSFORM_LINK_FAILURE';

export const DELETE_LINK = 'MAIN_PAGE/DELETE_LINK';
export const DELETE_LINK_SUCCESS = 'MAIN_PAGE/DELETE_LINK_SUCCESS';
export const DELETE_LINK_FAILURE = 'MAIN_PAGE/DELETE_LINK_FAILURE';

export const REDIRECT_TO = 'MAIN_PAGE/REDIRECT_TO';

const url = '/api/links';

function fetchUrls() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch({type: FETCH_DATA});

    return get(url, token)
      .then((data) => {
          dispatch({type: FETCH_DATA_SUCCESS, data});
      })
      .catch((errors) => dispatch({type: FETCH_DATA_FAILURE, errors}))

  }
}

function changeOriginalLink(link) {
  return { type: CHANGE_ORIGINAL_LINK, link}
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
          dispatch({type: TRANSFORM_LINK_FAILURE, errors});
      })
  }
}

function redirectTo(urlId) {
    return (dispatch) => {
      const token = localStorage.getItem('token');
      dispatch({type: REDIRECT_TO});

      return get(`${url}/${urlId}`, token)
        .then(() => {
            dispatch({ type: FETCH_DATA_SUCCESS });
        })
        .catch((errors) => dispatch({type: FETCH_DATA_FAILURE, errors}))
    }
}

function deleteLink(linkId) {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_LINK });
    const token = localStorage.getItem('token');

    return remove(`${url}/${linkId}`, token)
      .then(() => {
          dispatch({ type: DELETE_LINK_SUCCESS })
      })
      .catch((errors) => {
          dispatch({type: DELETE_LINK_FAILURE, errors});
      })
  }
}

export default {
  fetchUrls,
  changeOriginalLink,
  convertToShortLink,
  redirectTo,
  deleteLink
}