import React from 'react';
import { render } from '@testing-library/react';
import SignUpForm from './SignUpForm';

test('should return element for label on sign up page', () => {
  const { getByLabelText } = render(<SignUpForm />);
  expect(getByLabelText('Email')).not.toBeNull();
  expect(getByLabelText('Password')).not.toBeNull();
  expect(getByLabelText('Username')).not.toBeNull();
});
