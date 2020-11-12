/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import PropTypes from 'prop-types';
import { bookVehicle } from '../actions/bookVehicle';

const Book = ({ location }) => {
  let vehicle = {};
  if (typeof location.state === 'undefined') {
    vehicle = { name: '', model: '' };
  } else {
    vehicle = location.state.vehicle;
  }
  const { user } = useSelector(state => state.auth);
  const { id } = user.user;

  localStorage.setItem('user', JSON.stringify(user));

  const form = useRef();
  const checkBtn = useRef();
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [model, setModel] = useState(vehicle.model);
  const [name, setName] = useState(vehicle.name);
  const [loading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();
  const history = useHistory();

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const onChangeDate = e => {
    const date = e.target.value;
    setDate(date);
  };

  const onChangeCity = e => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangeModel = e => {
    const model = e.target.value;
    setModel(model);
  };

  const onChangeName = e => {
    const name = e.target.value;
    setName(name);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(bookVehicle(name, model, city, date, id));
      history.push('/bookings');
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="jumbotron">
        <h3>
          Book A Vehicle
        </h3>
      </header>
      <div className="form-group">
        <Form onSubmit={handleSubmit} ref={form}>
          <label htmlFor="vehicle">Vehicle</label>
          <Input
            type="text"
            name="vehicle"
            value={vehicle.name}
            className="form-control"
            onChange={onChangeName}
            validations={[required]}
          />

          <label htmlFor="model">Model</label>
          <Input
            type="text"
            name="model"
            value={vehicle.model}
            className="form-control"
            onChange={onChangeModel}
            validations={[required]}
          />

          <label htmlFor="city">City</label>
          <Input
            type="text"
            name="city"
            className="form-control"
            onChange={onChangeCity}
            validations={[required]}
          />

          <label htmlFor="date">Date</label>
          <Input
            type="date"
            name="date"
            className="form-control"
            onChange={onChangeDate}
            validations={[required]}
          />

          <div className="form-group">
            <button type="submit" className="btn btn-success btn-block" disabled={loading}>
              <span>Book</span>
              {loading && <span className="spinner-border spinner-border-sm" />}
            </button>
          </div>

          {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
          )}

          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </>
  );
};

Book.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string,
    key: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.shape({
      vehicle: PropTypes.shape({}),
    }),
  }).isRequired,
};

export default Book;
