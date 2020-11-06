/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FETCH_FAIL, FETCH_SUCCESS } from '../actions/types';
import { initialState, vehiclesReducer } from '../reducers/vehicles';

const Details = () => {
  const params = useParams();
  const { id } = params;
  console.log('Details -> props', id);

  const { user } = useSelector(state => state.auth);
  const [state, dispatch] = useReducer(vehiclesReducer, initialState);
  console.log('Details -> state', state);
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

  return (
    <div>
      { state.loading
        ? 'Loading'
        : state.vehicles.map(vehicle => {
          if (vehicle.id === parseInt(id, 10)) {
            return (
              <div key={vehicle.id}>
                <div>{ vehicle.name }</div>
                <div>{ vehicle.transmission }</div>
                <div>{ vehicle.model }</div>
                <div>{ vehicle.fee }</div>
                <div>
                  <Link to={{ pathname: '/book', state: { vehicle } }}>Book Now</Link>
                  {' '}
                </div>
              </div>
            );
          }
          return '';
        })}
    </div>
  );
};

export default Details;
