import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  REQUEST_REGISTRATION,
  REQUEST_REGISTRATION_SUCCESS
} from "../actions/registration-page";

import registrationActions from "../actions/registration-page";
import { REQUEST_SUCCESS } from "../actions/auth-page";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Registration page actions', () => {
  it('should return CHANGE_NAME when dispatch changeName', () => {
    const name = "Andrei";
    const expectedActions = [{ type: CHANGE_NAME, name }];
    const store = mockStore({});
    store.dispatch(registrationActions.changeName(name));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return CHANGE_EMAIL when dispatch changeName', () => {
    const email = "test@test.ru";
    const expectedActions = [{ type: CHANGE_EMAIL, email }];
    const store = mockStore({});
    store.dispatch(registrationActions.changeEmail(email));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return CHANGE_PASSWORD when dispatch changePassword', () => {
    const password = "123456";
    const expectedActions = [{ type: CHANGE_PASSWORD, password }];
    const store = mockStore({});
    store.dispatch(registrationActions.changePassword(password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return CHANGE_PASSWORD_CONFIRMATION when dispatch changePassConf', () => {
    const confPass = "123456";
    const expectedActions = [{ type: CHANGE_PASSWORD_CONFIRMATION, confPass }];
    const store = mockStore({});
    store.dispatch(registrationActions.changePassConf(confPass));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return REQUEST_REGISTRATION_SUCCESS when dispatch register', function () {
    const auth_token = "ASDASDASDASDSADAS";

    const expectedActions = [
      { type: REQUEST_REGISTRATION },
      { type: REQUEST_SUCCESS, auth_token },
      { type: REQUEST_REGISTRATION_SUCCESS },
      {"payload": {"args": ["/"], "method": "push"}, "type": "@@router/CALL_HISTORY_METHOD"}
    ];
    fetch.mockResponse(JSON.stringify({
      auth_token: auth_token,
      user: {
        id: 1,
        name: "Andrei",
        email: "test@test.ru",
        staff: "false",
      }
    }));

    const store = mockStore({
      registerPage: {
        name: "Andrei",
        email: "test@test.ru",
        password: '123456',
        confirmPassword: '123456'
      }
    });
    const admin = false;
    return store.dispatch(registrationActions.register(admin)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

});
