import {
  FETCH_SUCCESS,
  FETCH_FAIL,
} from '../actions/types';

const initialState = {
  loading: true,
  error: '',
  bookings: {},
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
        error: '',
      };

    case FETCH_FAIL:
      return {
        laoding: false,
        bookings: {},
        error: 'Something went wrong!',
      };

    default:
      return state;
  }
};

export { bookingsReducer, initialState };
