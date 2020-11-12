import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import AuthService from '../services/auth.service';

export const register = (username, password) => dispatch => AuthService
  .register(username, password).then(
    response => {
      if ('error' in response.data) {
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.error,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response.data },
        });
      }


      return Promise.resolve(response.data);
    },
    error => {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );

export const login = (username, password) => dispatch => AuthService
  .login(username, password).then(
    data => {
      if ('user' in data) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: data.error,
        });
      }

      return Promise.resolve(data);
    },
    error => {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );

export const logout = () => dispatch => {
  AuthService.logout();

  dispatch({
    type: SET_MESSAGE,
    payload: '',
  });

  dispatch({
    type: LOGOUT,
  });
};
