/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { bookVehicle } from '../actions/bookVehicle';

const Book = ({ location }) => {
  const { vehicle } = location.state;
  console.log('vehicle', vehicle);
  const { user } = useSelector(state => state.auth);
  const { id } = user.user;

  localStorage.setItem('user', JSON.stringify(user));

  const user2 = JSON.parse(localStorage.getItem('user'));
  console.log('Book -> user2', user2);

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
      // .then(() => {
      //   // console.log('hi');
      //   // console.log('bookVehicle -> response.data', response);
      // })
      // .catch(() => {
      //   setLoading(false);
      // });
    } else {
      setLoading(false);
    }
  };

  // };

  return (
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
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm" />}
            <span>Book</span>
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
        {/* <button type="submit">Book</button> */}
      </Form>
    </div>
  );
};

export default Book;
