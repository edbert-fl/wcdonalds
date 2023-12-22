import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@react-navigation/native';
import AddProductScreen from '../app/screens/AddProductScreen';
import { useNavigation } from '@react-navigation/native';


describe('AddProductScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddProductScreen />);
    const productInput = getByPlaceholderText('Product');
    const categoryInput = getByText('Select Category');
    const imageURLInput = getByPlaceholderText('Product Image URL');
    const priceInput = getByPlaceholderText('Price');
    const descriptionInput = getByPlaceholderText('Product Description');
    const addProductButton = getByText('Add Product');

    expect(productInput).toBeTruthy();
    expect(categoryInput).toBeTruthy();
    expect(imageURLInput).toBeTruthy();
    expect(priceInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(addProductButton).toBeTruthy();
  });

  test('handles invalid product name', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByPlaceholderText('Product'), '');

    fireEvent.press(getByText('Add Product'));

    expect(queryByText('Product name cannot be empty!')).toBeTruthy();
  });

  test('handles invalid category', () => {
    const { getByText, queryByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByText('Select Category'), null);

    fireEvent.press(getByText('Add Product'));

    expect(queryByText('Please select a category!')).toBeTruthy();
  });

  test('handles invalid product image URL', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByPlaceholderText('Product Image URL'), '');

    fireEvent.press(getByText('Add Product'));

    expect(queryByText('Please add a product image!')).toBeTruthy();
  });

  test('handles invalid price', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByPlaceholderText('Price'), '');

    fireEvent.press(getByText('Add Product'));

    expect(queryByText('Price cannot be empty!')).toBeTruthy();
  });

  test('handles invalid product description', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);

    fireEvent.changeText(getByPlaceholderText('Product Description'), '');

    fireEvent.press(getByText('Add Product'));

    expect(queryByText('Description cannot be empty!')).toBeTruthy();
  });

  test('handles zero price', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);
  
    fireEvent.changeText(getByPlaceholderText('Price'), '0');
  
    fireEvent.press(getByText('Add Product'));
  
    expect(queryByText('Price must be greater than 0!')).toBeTruthy();
  });

  test('handles negative price', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);
  
    fireEvent.changeText(getByPlaceholderText('Price'), '-10');
  
    fireEvent.press(getByText('Add Product'));
  
    expect(queryByText('Price must be greater than 0!')).toBeTruthy();
  });

  test('adds product with valid input', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddProductScreen />);
  
    fireEvent.changeText(getByPlaceholderText('Product'), 'Test Product');
    fireEvent.changeText(getByText('Select Category'), 'Valid Category');
    fireEvent.changeText(getByPlaceholderText('Product Image URL'), 'https://example.com/image.jpg');
    fireEvent.changeText(getByPlaceholderText('Price'), '10.99');
    fireEvent.changeText(getByPlaceholderText('Product Description'), 'A valid product description');
  
    fireEvent.press(getByText('Add Product'));
  
    expect(queryByText(/cannot be empty/i)).toBeFalsy();
  });
  
});
