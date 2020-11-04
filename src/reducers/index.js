import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import { vehiclesReducer as vehicles } from './vehicles';

const rootReducer = combineReducers({
  auth,
  message,
  vehicles,
});

export default rootReducer;
