/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

const Vehicle = ({ vehicle }) => {
  const {
    name,
    // model, transmission, fee,
  } = vehicle;

  return (
    <div className="card">
      <img
        className="card-img-top"
        src="https://cars.usnews.com/static/images/Auto/izmo/i44062349/2018_toyota_rav4_angularfront.jpg"
        alt="Card image"
      />
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        {/* <p className="card-text">
          Model:
          {model}
        </p>
        <p className="card-text">
          Transmission:
          {transmission}
        </p>
        <p className="card-text">
          Fee:
          {fee}
        </p> */}
        <a href="#" className="btn btn-primary">
          See Details
        </a>
      </div>
    </div>
  );
};

export default Vehicle;

Vehicle.propTypes = {
  vehicle: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    transmission: PropTypes.string,
    fee: PropTypes.string,
  }).isRequired,
};
