import {
  FETCH_SUCCESS,
  FETCH_FAIL,
} from '../actions/types';

const initialState = {
  loading: true,
  error: '',
  vehicles: {},
};

const vehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        loading: false,
        vehicles: action.payload,
        error: '',
      };

    case FETCH_FAIL:
      return {
        laoding: false,
        vehicles: {},
        error: 'Something went wrong!',
      };

    default:
      return state;
  }
};

export { vehiclesReducer, initialState };
