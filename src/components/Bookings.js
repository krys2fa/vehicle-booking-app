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
      .post(`${apiUrl}appointments`, {
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
                <li key={booking.id}>
                  {booking.date}
                  {' '}
                  {booking.city}
                  {' '}
                  {booking.model}
                  {' '}
                  {booking.vehicle}
                </li>
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
