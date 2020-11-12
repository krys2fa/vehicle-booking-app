import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import { vehiclesReducer as vehicles } from './vehicles';
import { bookingsReducer as bookings } from './bookings';

const rootReducer = combineReducers({
  auth,
  message,
  vehicles,
  bookings,
});

export default rootReducer;
