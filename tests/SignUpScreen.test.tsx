import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../app/screens/SignUpScreen';

describe('SignUpScreen', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUpScreen />);
    expect(getByText("WcDonald's")).toBeTruthy();
    expect(getByPlaceholderText('Display Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('handles display name input change', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);
    const displayNameInput = getByPlaceholderText('Display Name');
    
    fireEvent.changeText(displayNameInput, 'John Doe');
    
    expect(displayNameInput.props.value).toBe('John Doe');
  });

  test('handles email input change', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);
    const emailInput = getByPlaceholderText('Email');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    
    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('handles password input change', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);
    const passwordInput = getByPlaceholderText('Password');
    
    fireEvent.changeText(passwordInput, 'password123');
    
    expect(passwordInput.props.value).toBe('password123');
  });
});
