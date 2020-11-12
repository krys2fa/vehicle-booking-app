import React from 'react';
import PropTypes from 'prop-types';

const Vehicle = ({ vehicle }) => {
  const {
    name, photo,
  } = vehicle;

  return (
    <div className="card width">
      <img
        className="card-img-top"
        src={photo}
        alt=""
      />
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <button type="button" className="btn btn-success">
          See Details
        </button>
      </div>
    </div>
  );
};

export default Vehicle;

Vehicle.propTypes = {
  vehicle: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};
