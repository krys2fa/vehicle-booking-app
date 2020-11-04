import React from 'react';
import PropTypes from 'prop-types';

const Detail = ({
  name, model, transmission, fee,
}) => (
  <div>
    <h1>{ name }</h1>
    {console.log('name', name)}

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

export default Detail;

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  transmission: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
};
