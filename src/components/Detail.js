/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import PropTypes from 'prop-types';

const Detail = ({ vehicle }) => {
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

export default Detail;

// Detail.propTypes = {
//   name: PropTypes.string.isRequired,
//   model: PropTypes.string.isRequired,
//   transmission: PropTypes.string.isRequired,
//   fee: PropTypes.string.isRequired,
// };
