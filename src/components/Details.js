import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FETCH_FAIL, FETCH_SUCCESS } from '../actions/types';
import { initialState, vehiclesReducer } from '../reducers/vehicles';

const Details = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useSelector(state => state.auth);
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
      .catch(() => {
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
              <div className="card width" key={vehicle.id}>
                <img
                  className="card-img-top"
                  src={vehicle.photo}
                  alt=""
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
                    className="btn btn-success"
                    to={{ pathname: '/book', state: { vehicle } }}
                  >
                    Book Now
                  </Link>
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
