import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../app/screens/LoginScreen';
// 
describe('LoginScreen', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText("WcDonald's")).toBeTruthy();
  });
});