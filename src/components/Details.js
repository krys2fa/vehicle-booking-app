/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
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
              <div className="card" key={vehicle.id}>
                <img
                  className="card-img-top"
                  src="https://cars.usnews.com/static/images/Auto/izmo/i44062349/2018_toyota_rav4_angularfront.jpg"
                  alt="Card image"
                />
                <div className="card-body">
                  <h4 className="card-title">{vehicle.name}</h4>
                  <p className="card-text">
                    Model:
                    <span>{vehicle.model}</span>
                  </p>
                  <p className="card-text">
                    Transmission:
                    <span>{vehicle.transmission}</span>
                  </p>
                  <p className="card-text">
                    Fee:
                    <span>{vehicle.fee}</span>
                  </p>
                  <Link
                    className="btn btn-primary"
                    to={{ pathname: '/book', state: { vehicle } }}
                  >
                    Book Now
                  </Link>

                  {/* <a href="#" className="btn btn-primary">
                    See Details
                  </a> */}
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
