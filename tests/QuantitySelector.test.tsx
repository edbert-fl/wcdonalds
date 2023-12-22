import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuantitySelector from '../app/components/QuantitySelector';

describe('QuantitySelector Component', () => {
  test('renders correctly with initial quantity', () => {
    const { getByText } = render(<QuantitySelector quantity={3} onQuantityChange={() => {}} />);
    
    expect(getByText('3')).toBeTruthy();
  });

  test('subtracts quantity when "-" button is pressed', () => {
    const mockOnQuantityChange = jest.fn();
    const { getByText } = render(<QuantitySelector quantity={3} onQuantityChange={mockOnQuantityChange} />);
    
    fireEvent.press(getByText('-'));
    
    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
  });

  test('does not subtract quantity below 0', () => {
    const mockOnQuantityChange = jest.fn();
    const { getByText } = render(<QuantitySelector quantity={0} onQuantityChange={mockOnQuantityChange} />);
    
    fireEvent.press(getByText('-'));
    
    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });

  test('adds quantity when "+" button is pressed', () => {
    const mockOnQuantityChange = jest.fn();
    const { getByText } = render(<QuantitySelector quantity={3} onQuantityChange={mockOnQuantityChange} />);
    
    fireEvent.press(getByText('+'));
    
    expect(mockOnQuantityChange).toHaveBeenCalledWith(4);
  });
});
