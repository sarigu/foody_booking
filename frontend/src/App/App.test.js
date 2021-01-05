import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('should return input for label on login page', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText('Email')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
});
