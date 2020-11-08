/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FETCH_FAIL, FETCH_SUCCESS } from '../actions/types';
import { initialState, bookingsReducer } from '../reducers/bookings';

const Bookings = () => {
  const { user } = useSelector(state => state.auth);

  const history = useHistory();
  const [state, dispatch] = useReducer(bookingsReducer, initialState);
  const apiUrl = 'https://vehicle-booking-api.herokuapp.com/v1/';

  useEffect(() => {
    axios
      .get(`${apiUrl}appointments`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(response => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
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
          Bookings
        </h3>
      </header>
      <div>
        {state.loading
          ? 'Loading'
          : state.bookings.map(booking => {
            console.log('booking', booking);
            console.log('booking.user_id', typeof booking.user_id);
            console.log('user.user.id', typeof user.user.id);
            if (user.user.id === booking.user_id) {
              return (
                <div className="card" key={booking.id}>
                  <div className="card-header">{booking.date}</div>
                  <div className="card-body">
                    <p>
                      City:
                      <span>{booking.city}</span>
                    </p>
                    <p>
                      Model:
                      <span>{booking.model}</span>
                    </p>
                    <p>
                      Vehicle:
                      <span>{booking.vehicle}</span>
                    </p>
                  </div>
                </div>
              );
            }
            return '';
          })}

        {console.log('state', state) }
        {state.error ? state.error : null}
      </div>
    </div>
  );
};

export default Bookings;
