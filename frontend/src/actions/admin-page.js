import { get } from "../api";

export const FETCH_RECORDS = 'ADMIN_PAGE/FETCH_RECORDS';
export const FETCH_RECORDS_SUCCESS = 'ADMIN_PAGE/FETCH_RECORDS_SUCCESS';
export const FETCH_RECORDS_FAILURE = 'ADMIN_PAGE/FETCH_RECORDS_FAILURE';


function fetchRecords() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch({ type: FETCH_RECORDS });

    return get('/api/admin', token)
      .then((data) => {
        dispatch({ type: FETCH_RECORDS_SUCCESS, data });
      })
      .catch((errors) => dispatch({ type: FETCH_RECORDS_FAILURE, errors }))

  }
}

export default  {
  fetchRecords
}