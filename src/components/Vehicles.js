/* eslint-disable react/no-array-index-key */
import React, { useReducer, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Vehicle from './Vehicle';
import { FETCH_FAIL, FETCH_SUCCESS } from '../actions/types';
import { initialState, vehiclesReducer } from '../reducers/vehicles';

const Vehicles = () => {
  const { user } = useSelector(state => state.auth);

  const history = useHistory();
  const [state, dispatch] = useReducer(vehiclesReducer, initialState);
  const apiUrl = 'https://vehicle-booking-api.herokuapp.com/v1/';

  useEffect(() => {
    axios
      .get(`${apiUrl}vehicles`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(response => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        dispatch({ type: FETCH_FAIL });
      });
  }, []);

  console.log('Profile -> user', user);

  if (user === null) {
    history.push('/login');
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.user.username}</strong>
          {' '}
          Vehicles
        </h3>
      </header>
      <div>
        {state.loading
          ? 'Loading'
          : state.vehicles.map(vehicle => (
            <Link
              key={vehicle.id}
              to={`vehicle/${vehicle.id}`}
            >
              <Vehicle key={vehicle.id} vehicle={vehicle} />
            </Link>
          ))}
        {state.error ? state.error : null}
      </div>
    </div>
  );
};

export default Vehicles;
