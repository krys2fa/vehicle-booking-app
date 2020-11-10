import React from 'react';
import { render } from '@testing-library/react';
import Vehicle from '../../components/Vehicle';

it('renders the Vehicle component correctly', () => {
  const vehicle = {
    name: 'Daewoo Lemans',
    transmission: 'Manual',
    fee: '1500',
  };
  const { asFragment } = render(<Vehicle vehicle={vehicle} />);
  expect(asFragment()).toMatchSnapshot();
});
