import { get } from "../api";

export const FETCH_RECORDS = 'ADMIN_PAGE/FETCH_RECORDS';
export const FETCH_RECORDS_SUCCESS = 'ADMIN_PAGE/FETCH_RECORDS_SUCCESS';
export const FETCH_RECORDS_FAILURE = 'ADMIN_PAGE/FETCH_RECORDS_FAILURE';

export const CHANGE_SEARCH_QUERY = 'ADMIN_PAGE/CHANGE_SEARCH_QUERY';
export const CHANGE_PAGE_NUMBER = 'ADMIN_PAGE/CHANGE_PAGE_NUMBER';
export const CHANGE_OFFSET = 'ADMIN_PAGE/CHANGE_OFFSET';
export const REFRESH_REPORT_DATA = 'ADMIN_PAGE/REFRESH_REPORT_DATA';

function refreshReportData() {
  return { type: REFRESH_REPORT_DATA }
}

function changeSearch(query) {
  return { type: CHANGE_SEARCH_QUERY, query }
}

function changePageNumber(number) {
  return { type: CHANGE_PAGE_NUMBER, number }
}

function changeOffset(number) {
  return { type: CHANGE_OFFSET, number }
}

function fetchRecords() {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    const {startId, offset, pageNumber, searchQuery, perPage } = getState().adminPage;
    dispatch({ type: FETCH_RECORDS });
    return get(`/api/admin?offset=${offset}&page_number=${pageNumber}&search_query=${searchQuery}&per_page=${perPage}`, token)
      .then((data) => {
        dispatch({ type: FETCH_RECORDS_SUCCESS, data });
      })
      .catch((errors) => dispatch({ type: FETCH_RECORDS_FAILURE, errors }))

  }
}

export default  {
  fetchRecords,
  changeSearch,
  changePageNumber,
  changeOffset,
  refreshReportData
}