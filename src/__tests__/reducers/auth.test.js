import auth from '../../reducers/auth';
import * as actionTypes from '../../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
const payload = { user: {} };

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

describe('register user', () => {
  it('should handle REGISTER_SUCCESS', () => {
    expect(
      auth([], {
        type: actionTypes.REGISTER_SUCCESS,
      }),
    ).toEqual({
      isLoggedIn: false,
    });
  });

  it('should handle REGISTER_FAIL', () => {
    expect(
      auth([], {
        type: actionTypes.REGISTER_FAIL,
      }),
    ).toEqual({
      isLoggedIn: false,
    });
  });
});

describe('login user', () => {
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth([], {
        type: actionTypes.LOGIN_SUCCESS,
        payload: { user: {} },
      }),
    ).toEqual({
      isLoggedIn: true,
      user: payload.user,
    });
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      auth([], {
        type: actionTypes.LOGIN_FAIL,
      }),
    ).toEqual({
      isLoggedIn: false,
      user: null,
    });
  });
});

describe('logout user', () => {
  it('should handle LOGOUT', () => {
    expect(
      auth([], {
        type: actionTypes.LOGOUT,
        payload: { user: {} },
      }),
    ).toEqual({
      isLoggedIn: false,
      user: null,
    });
  });
});

describe('INITIAL_STATE', () => {
  test('it should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });
});
