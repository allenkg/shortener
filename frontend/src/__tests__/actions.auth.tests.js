import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
  REQUEST,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGOUT,
  ALREADY_LOG_IN
} from "../actions/auth-page";
import loginActions from "../actions/auth-page";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Actions', () => {
  it('should return CHANGE_EMAIL when dispatch changeEmail', function () {
    const email = 'test@eemail.com';
    const expectedActions = [{ type: CHANGE_EMAIL, email }];
    const store = mockStore({});
    store.dispatch(loginActions.changeEmail(email));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return CHANGE_PASSWORD when dispatch changePassword', function () {
    const password = '123456';
    const expectedActions = [{ type: CHANGE_PASSWORD, password }];
    const store = mockStore({});
    store.dispatch(loginActions.changePassword(password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return ALREADY_LOG_IN when dispatch alreadyLogIn', function () {
    const expectedActions = [{ type: ALREADY_LOG_IN }];
    const store = mockStore({});
    store.dispatch(loginActions.alreadyLogIn());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return LOGOUT when dispatch logout', function () {
    const expectedActions = [{ type: LOGOUT }];
    const store = mockStore({});
    store.dispatch(loginActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return REQUEST_SUCCESS when dispatch login', function () {
    const auth_token = "ASDASDASDASDSADAS";
    const expectedActions = [
      { type: REQUEST }
    ];

    const store = mockStore({
      authPage: {
        email: 'test@eemail.com',
        password: "123456",
      }
    });

    fetch.mockResponse(JSON.stringify({
      auth_token: auth_token,
      user: {
        id: 1,
        name: "Andrei",
        email: "test@test.ru",
        staff: "false",
      }
    }));
    store.dispatch(loginActions.login());
    expect(store.getActions()).toEqual(expectedActions);
  });


});

