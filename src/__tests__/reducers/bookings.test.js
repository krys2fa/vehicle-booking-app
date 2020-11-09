import { bookingsReducer, initialState } from '../../reducers/bookings';
import * as actionTypes from '../../actions/types';

describe('bookings reducer', () => {
  it('should handle FETCH_SUCCESS', () => {
    expect(
      bookingsReducer([], {
        type: actionTypes.FETCH_SUCCESS,
      }),
    ).toEqual({
      loading: false,
      error: '',
    });
  });

  it('should handle FETCH_FAIL', () => {
    expect(
      bookingsReducer([], {
        type: actionTypes.FETCH_FAIL,
      }),
    ).toEqual({
      laoding: false,
      bookings: {},
      error: 'Something went wrong!',
    });
  });
});

describe('INITIAL_STATE', () => {
  test('it should return the initial state', () => {
    expect(bookingsReducer(undefined, {})).toEqual(initialState);
  });
});
