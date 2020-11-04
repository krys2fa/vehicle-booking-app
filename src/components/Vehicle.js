import React from 'react';
import PropTypes from 'prop-types';

const Vehicle = ({ vehicle }) => {
  const {
    name, model, transmission, fee,
  } = vehicle;

  return (
    <div>
      <h1>{ name }</h1>
      {console.log('name', vehicle.name)}

      <p>
        Model:
        { model }
      </p>
      <p>
        Transmission:
        { transmission }
      </p>
      <p>
        Fee:
        { fee }
      </p>
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
