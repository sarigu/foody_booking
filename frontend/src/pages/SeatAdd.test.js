import React from 'react';
import { render } from '@testing-library/react';
import SeatAdd from './SeatAdd';

test('should return element for label on sign up page', () => {
  const { getByLabelText } = render(<SeatAdd />);
  expect(getByLabelText('Seat Name')).not.toBeNull();
  expect(getByLabelText('Seat Capacity')).not.toBeNull();
  expect(getByLabelText('Seat Status')).not.toBeNull();
});
