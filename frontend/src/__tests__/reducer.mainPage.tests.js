import merge from 'xtend';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CHANGE_ORIGINAL_LINK,
  SHORT_LINK_CHANGE,
  TRANSFORM_LINK,
  TRANSFORM_LINK_SUCCESS,
  TRANSFORM_LINK_FAILURE,
  DELETE_LINK_SUCCESS,
  REDIRECT_TO,
  SET_TRACKER_INITIAL_STATE,
  SET_TRACKER,
  SET_TRACKER_SUCCESS,
  DELETE_LINK
} from "../actions/main-page";

import mainPageReducer, { getUserShortURLs } from "../reducers/main-page";

const INITIAL_STATE = {
  data: [],
  userURLs: [],
  originalLink: '',
  shortLink: '',
  isLoading: false,
  linkId: null,
  linkObject: {},
  errors: {}
};

describe('Main page reducer', () => {

  it('should return initial state', () => {
    expect(mainPageReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle SET_TRACKER_INITIAL_STATE', () => {
    const action = {type: SET_TRACKER_INITIAL_STATE };
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE);
  });

  it('should handle CHANGE_ORIGINAL_LINK', function () {
    const link = 'lnk.com/test';
    const action = {type: CHANGE_ORIGINAL_LINK, link};
    const expectedState = merge(INITIAL_STATE, {originalLink: link });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle SHORT_LINK_CHANGE', function () {
    const link = 'lnk.com/test';
    const action = {type: SHORT_LINK_CHANGE, link};
    const expectedState = merge(INITIAL_STATE, {shortLink: link });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle REDIRECT_TO', function () {
    const currentLinkObject = {
      id: 1,
      shortLink: 'DSDSFLD'
    };
    const action = {type: REDIRECT_TO, currentLinkObject };
    const expectedState = merge(INITIAL_STATE, {linkObject: currentLinkObject });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_TRACKER', function () {
    const action = {type: SET_TRACKER };
    const expectedState = merge(INITIAL_STATE, {isLoading: true});
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle SET_TRACKER_SUCCESS', function () {
    const action = {type: SET_TRACKER_SUCCESS };
    const expectedState = merge(INITIAL_STATE, {});
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle DELETE_LINK', function () {
    const action = {type: DELETE_LINK };
    const expectedState = merge(INITIAL_STATE, {isLoading: true});
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle DELETE_LINK_SUCCESS', function () {
    const action = {type: DELETE_LINK_SUCCESS };
    const expectedState = merge(INITIAL_STATE, {
      isLoading: false,
      shortLink: '',
      originalLink: '',
      errors: INITIAL_STATE.errors,
      data: [],
      userURLs: [],
      linkId: null
    });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle TRANSFORM_LINK', function () {
    const action = {type: TRANSFORM_LINK};
    const expectedState = merge(INITIAL_STATE, {isLoading: true});
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle TRANSFORM_LINK_SUCCESS', function () {
    const data = {
      created_at: "2018-11-23T04:24:52.751Z",
      deleted: false,
      id: 4,
      orig_link: "www.google.com/tests/4",
      short_link: "T3KQGN",
      updated_at: "2018-11-23T04:24:52.751Z",
      user_id: 4
    };
    const action = {type: TRANSFORM_LINK_SUCCESS, data };
    const expectedState = merge(INITIAL_STATE, {
      isLoading: false,
      shortLink: data.short_link,
      originalLink: data.orig_link,
      linkId: data.id,
      data: INITIAL_STATE.data.concat([action.data]),
      userURLs: INITIAL_STATE.userURLs.concat([action.data])
    });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle TRANSFORM_LINK_FAILURE', function () {
    const errors = {};
    const action = {type: TRANSFORM_LINK_FAILURE, errors };
    const expectedState = merge(INITIAL_STATE, {
      isLoading: false,
      shortLink: '',
      originalLink: '',
      errors: {},
      linkId: null,
    });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle FETCH_DATA', function () {
    const action = {type: FETCH_DATA};
    const expectedState = merge(INITIAL_STATE, {isLoading: true});
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle FETCH_DATA_SUCCESS', function () {
    const data = [];
    const action = {type: FETCH_DATA_SUCCESS, data };
    const expectedState = merge(INITIAL_STATE, {
      isLoading: false,
      data: data,
      userURLs: getUserShortURLs(data)
    });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle FETCH_DATA_FAILURE', function () {
    const errors = {};
    const action = {type: FETCH_DATA_FAILURE, errors };
    const expectedState = merge(INITIAL_STATE, {
      isLoading: false,
      shortLink: '',
      originalLink: '',
      errors: {},
      linkId: null,
    });
    expect(mainPageReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });



});