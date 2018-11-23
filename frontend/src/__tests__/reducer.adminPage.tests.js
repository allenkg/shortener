import merge from 'xtend';
import {
  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS
} from "../actions/admin-page";

import adminPageActions from "../actions/admin-page";
import adminPage from "../reducers/admin-page";

const INITIAL_STATE = {
  trackers: [],
  trackersLoading: false,
  pageNumber: 1,
  totalPages: null
};

describe('Admin page reducer', () => {
  
  it('should return initial state', () => {
    expect(adminPage(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle FETCH_RECORDS', function () {
    const action = { type: FETCH_RECORDS };
    const expectedState = merge(INITIAL_STATE, {trackersLoading: true});
    expect(adminPage(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle FETCH_RECORDS_SUCCESS', function () {
    const data = [
      {created_at: "2018-11-22T07:47:53.564Z",
        id: 1,
        link_id: 1,
        location: "Kyrgyzstan",
        updated_at: "2018-11-22T07:47:53.564Z",
        user_id: 1
      },
      {created_at: "2018-11-22T07:47:53.564Z",
        id: 2,
        link_id: 2,
        location: "Russia",
        updated_at: "2018-11-20T10:47:53.564Z",
        user_id: 2
      },
      {created_at: "2018-11-21T07:47:53.564Z",
        id: 3,
        link_id: 1,
        location: "Poland",
        updated_at: "2018-11-22T05:47:53.564Z",
        user_id: 3
      }
    ];
    const action = { type: FETCH_RECORDS_SUCCESS, data };
    const expectedState = merge(INITIAL_STATE, {trackers: action.data });
    expect(adminPage(INITIAL_STATE, action)).toEqual(expectedState);
  });


})