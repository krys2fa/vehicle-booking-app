import React from 'react';
import PropTypes from 'prop-types';

const Detail = ({
  name, model, transmission, fee,
}) => (
  <div>
    <h1>{ name }</h1>

    <p>{ model }</p>
    <p>{ transmission }</p>
    <p>{ fee }</p>

  </div>

);

export default Detail;

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  transmission: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
};
