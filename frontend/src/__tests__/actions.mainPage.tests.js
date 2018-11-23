import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CHANGE_ORIGINAL_LINK,
  SHORT_LINK_CHANGE,
  TRANSFORM_LINK,
  TRANSFORM_LINK_SUCCESS,
  TRANSFORM_LINK_FAILURE,
  DELETE_LINK,
  DELETE_LINK_SUCCESS,
  DELETE_LINK_FAILURE,
  REDIRECT_TO,
  SET_TRACKER_INITIAL_STATE,
  SET_TRACKER,
  SET_TRACKER_FAILURE,
  SET_TRACKER_SUCCESS
} from "../actions/main-page";

import mainPageActions from "../actions/main-page";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Main page actions', () => {


  it('should return FETCH_DATA_SUCCESS when page loaded', () => {
    const data = [
      {id: 1, short_link: 'DSFHGK34S', orig_link: 'www.google.com/tests/1', user_id: 1 },
      {id: 2, short_link: 'DSFSOK740', orig_link: 'www.google.com/tests/2', user_id: 1 },
      {id: 3, short_link: 'DSF3OK74G', orig_link: 'www.google.com/tests/3', user_id: 2 }
    ];
    fetch.mockResponse(JSON.stringify([
      {id: 1, short_link: 'DSFHGK34S', orig_link: 'www.google.com/tests/1', user_id: 1 },
      {id: 2, short_link: 'DSFSOK740', orig_link: 'www.google.com/tests/2', user_id: 1 },
      {id: 3, short_link: 'DSF3OK74G', orig_link: 'www.google.com/tests/3', user_id: 2 }
    ]));
    const expectedActions = [
      { type: FETCH_DATA },
      { type: FETCH_DATA_SUCCESS, data }
    ];

    const store = mockStore({});
    return store.dispatch(mainPageActions.fetchUrls()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    })

  });

  it('should return FETCH_DATA_FAILURE when fetch data with errors', () => {

    const errors = {err: 'err'};
    fetch.mockResponse(JSON.stringify(errors), {status: 404});

    const expectedActions = [
      { type: FETCH_DATA },
      { type: FETCH_DATA_FAILURE, errors }
    ];

    const store = mockStore({});
    return store.dispatch(mainPageActions.fetchUrls()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    })
  });

  it('should return CHANGE_ORIGIN_LINK when dispatch changeOriginalLink', function () {
    const link = 'www.google.com';
    const expectedActions = [{ type: CHANGE_ORIGINAL_LINK, link }];

    const store = mockStore({});
    store.dispatch(mainPageActions.changeOriginalLink(link));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return SHORT_LINK_CHANGE when dispatch shortLinkChange', function () {
    const link = 'www.google.com';
    const expectedActions = [{ type: SHORT_LINK_CHANGE, link }];

    const store = mockStore({});
    store.dispatch(mainPageActions.shortLinkChange(link));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return TRANSFORM_LINK_SUCCESS when dispatch convertToShortLink', function () {
    const data = {
      created_at: "2018-11-23T04:24:52.751Z",
      deleted: false,
      id: 4,
      orig_link: "www.google.com/tests/4",
      short_link: "T3KQGN",
      updated_at: "2018-11-23T04:24:52.751Z",
      user_id: 4
    };

    fetch.mockResponse(JSON.stringify({
      created_at: "2018-11-23T04:24:52.751Z",
      deleted: false,
      id: 4,
      orig_link: "www.google.com/tests/4",
      short_link: "T3KQGN",
      updated_at: "2018-11-23T04:24:52.751Z",
      user_id: 4
    }));

    const expectedActions = [
      { type: TRANSFORM_LINK },
      { type: TRANSFORM_LINK_SUCCESS, data }
    ];

    const store = mockStore({ mainPage: {originalLink: "www.google.com/tests/4" }});
    return store.dispatch(mainPageActions.convertToShortLink()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('should return TRANSFORM_LINK_FAILURE when dispatch convertToShortLink error', function () {
    const errors = {err: 'err'};
    fetch.mockResponse(JSON.stringify(errors), {status: 404});

    const expectedActions = [
      { type: TRANSFORM_LINK },
      { type: TRANSFORM_LINK_FAILURE, errors }
    ];

    const store =mockStore({ mainPage: {originalLink: "www.google.com/tests/4" }});
    return store.dispatch(mainPageActions.convertToShortLink()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    })
  });

  it('should return DELETE_LINK_SUCCESS when dispatch deleteLink', function () {
    const linkId = 1;

    const expectedActions = [
      { type: DELETE_LINK },
      { type: DELETE_LINK_SUCCESS }
    ];

    fetch.mockResponse(JSON.stringify({}));

    const store = mockStore({});
    return store.dispatch(mainPageActions.deleteLink(linkId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('should return DELETE_LINK_FAILURE when dispatch deleteLink with errors', function () {
    const linkId = 1;
    const errors = {err: 'err'};

    const expectedActions = [
      { type: DELETE_LINK },
      { type: DELETE_LINK_FAILURE, errors }
    ];
    fetch.mockResponse(JSON.stringify(errors), {status: 404});

    const store = mockStore({});
    return store.dispatch(mainPageActions.deleteLink(linkId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('should return REDIRECT_TO when dispatch redirectTo', function () {
    const currentLinkObject = {
      id: 1,
      shortLink: 'DSDSFLD'
    };

    const expectedActions = [
      { type: REDIRECT_TO, currentLinkObject }
    ];

    const store = mockStore({});
    store.dispatch(mainPageActions.redirectTo(currentLinkObject));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return SET_TRACKER_INITIAL_STATE when dispatch setTrackerInitialState', function () {
    const expectedActions = [ { type: SET_TRACKER_INITIAL_STATE }];
    const store = mockStore({});

    store.dispatch(mainPageActions.setTrackerInitialState());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return SET_TRACKER_SUCCESS when dispatch setTracker', function () {
    const id = 1;
    const expectedActions = [
      {type: SET_TRACKER },
      {type: SET_TRACKER_SUCCESS }
    ];
    fetch.mockResponse(JSON.stringify({}));

    const store = mockStore({});
    return store.dispatch(mainPageActions.setTracker(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('should return SET_TRACKER_FAILURE when dispatch setTracker with error', function () {
    const id = 1;
    const errors = {err: 'err'};
    const expectedActions = [
      {type: SET_TRACKER },
      {type: SET_TRACKER_FAILURE, errors }
    ];
    fetch.mockResponse(JSON.stringify(errors), {status: 404});

    const store = mockStore({});
    return store.dispatch(mainPageActions.setTracker(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

});