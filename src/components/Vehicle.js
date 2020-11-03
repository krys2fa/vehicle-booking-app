/* eslint-disable react/no-array-index-key */
import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import authHeader from '../services/auth-header';

const initialState = {
  loading: true,
  error: '',
  vehicles: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        vehicles: action.payload,
        error: '',
      };

    case 'FETCH_ERROR':
      return {
        laoding: false,
        vehicles: {},
        error: 'Something went wrong!',
      };

    default:
      return state;
  }
};

const Vehicle = () => {
  const { user } = useSelector(state => state.auth);
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = 'https://vehicle-booking-api.herokuapp.com/v1/';
  console.log(authHeader());

  useEffect(() => {
    axios
      .get(`${apiUrl}vehicles`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR' });
      });
  }, []);

  console.log('Profile -> user', user);

  if (user === null) {
    history.push('/login');
  }

  // useEffect(() => {
  //   dispatch(getVehicles())
  //     .then()
  //     .catch(error => { console.log(`${error}`); });
  // }, []);

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
        { state.loading ? 'Loading' : console.log(state) }
        { state.error ? state.error : null }
      </div>
      <p>
        <strong>Token:</strong>
        {' '}
        {/* {user.token} */}
        {' '}
        ...
        {' '}
        {/* {user.accessToken.substr(user.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong>
        {' '}
        {user.user.id}
      </p>
      {/* <p>
        <strong>Email:</strong>
        {' '}
        {user.email}
      </p> */}
      {/* <strong>Authorities:</strong>
      <ul>
        {user.roles
          && user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Vehicle;
