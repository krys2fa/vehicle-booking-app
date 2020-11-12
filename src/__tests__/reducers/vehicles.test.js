import { vehiclesReducer, initialState } from '../../reducers/vehicles';
import * as actionTypes from '../../actions/types';

describe('vehicle reducer', () => {
  it('should handle FETCH_SUCCESS', () => {
    expect(
      vehiclesReducer([], {
        type: actionTypes.FETCH_SUCCESS,
      }),
    ).toEqual({
      loading: false,
      error: '',
    });
  });

  it('should handle FETCH_FAIL', () => {
    expect(
      vehiclesReducer([], {
        type: actionTypes.FETCH_FAIL,
      }),
    ).toEqual({
      laoding: false,
      vehicles: {},
      error: 'Something went wrong!',
    });
  });
});

describe('INITIAL_STATE', () => {
  test('it should return the initial state', () => {
    expect(vehiclesReducer(undefined, {})).toEqual(initialState);
  });
});
