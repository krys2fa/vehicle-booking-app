/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  POST_SUCCESS,
  POST_FAIL,
  SET_MESSAGE,
} from './types';

import BookService from '../services/user.service';

export const bookVehicle = (name, model, city, date, id) => dispatch => BookService.bookVehicle(name, model, city, date, id).then(
  () => {
    dispatch({
      type: POST_SUCCESS,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();

    dispatch({
      type: POST_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);
