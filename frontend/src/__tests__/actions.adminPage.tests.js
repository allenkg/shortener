import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS
} from "../actions/admin-page";

import adminPageActions from "../actions/admin-page";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Admin page Actions", () => {
  it('should return FETCH_RECORDS_SUCCESS when dispatch FETCH_RECORDS', function () {
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

    const expectedActinos = [
      { type: FETCH_RECORDS},
      { type: FETCH_RECORDS_SUCCESS, data}
    ];
    fetch.mockResponse(JSON.stringify(data));

    const store = mockStore({
      adminPage: {
        offset: 0,
        pageNumber: 1,
        searchQuery: '',
        perPage: 5,
      }
    });
    return store.dispatch(adminPageActions.fetchRecords()).then(() => {
      expect(store.getActions()).toEqual(expectedActinos);
    })
  });
});