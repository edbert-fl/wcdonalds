import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@react-navigation/native';
import AddPromotionScreen from '../app/screens/AddPromotionScreen';

describe('AddPromotionScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddPromotionScreen />);
    const promotionInput = getByPlaceholderText('Promotion');
    const productsInput = getByText('Select Products');
    const artURLInput = getByPlaceholderText('Art URL');
    const descriptionInput = getByPlaceholderText('Description');
    const rateInput = getByPlaceholderText('Rate');
    const addPromotionButton = getByText('Add Promotion');

    expect(promotionInput).toBeTruthy();
    expect(productsInput).toBeTruthy();
    expect(artURLInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(rateInput).toBeTruthy();
    expect(addPromotionButton).toBeTruthy();
  });

  test('handles invalid promotion name', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByPlaceholderText('Promotion'), '');

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText('Name cannot be empty!')).toBeTruthy();
  });

  test('handles invalid selected products', () => {
    const { getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByText('Select Products'), []);

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText('At least one product needs to be selected!')).toBeTruthy();
  });

  test('handles invalid promotion art URL', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByPlaceholderText('Art URL'), '');

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText('Promotion Art URL cannot be empty!')).toBeTruthy();
  });

  test('handles invalid promotion description', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByPlaceholderText('Description'), '');

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText('Promotion Description cannot be empty!')).toBeTruthy();
  });

  test('handles invalid promotion rate', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByPlaceholderText('Rate'), '-1');

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText('Rate must be between 0 and 1!')).toBeTruthy();
  });

  test('adds promotion with valid input', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<AddPromotionScreen />);

    fireEvent.changeText(getByPlaceholderText('Promotion'), 'Test Promotion');
    fireEvent.changeText(getByText('Select Products'), ['productId1', 'productId2']);
    fireEvent.changeText(getByPlaceholderText('Art URL'), 'https://example.com/image.jpg');
    fireEvent.changeText(getByPlaceholderText('Description'), 'A valid promotion description');
    fireEvent.changeText(getByPlaceholderText('Rate'), '0.5');

    fireEvent.press(getByText('Add Promotion'));

    expect(queryByText(/cannot be empty/i)).toBeFalsy();
  });
});
