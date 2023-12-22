import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddressCard from '../app/components/AddressCard';

describe('AddressCard Component', () => {
  test('renders correctly with no address saved', () => {
    const setAddressSheetVisibleMock = jest.fn();
    const { getByText, queryByText } = render(
      <AddressCard address={{}} setAddressSheetVisible={setAddressSheetVisibleMock} />
    );

    expect(getByText('No address saved')).toBeTruthy();
  });

  test('renders correctly with address', () => {
    const setAddressSheetVisibleMock = jest.fn();
    const address = {
      address: {
        line1: '123 Main St',
        city: 'Cityville',
      },
    };
    const { getByText } = render(
      <AddressCard address={address} setAddressSheetVisible={setAddressSheetVisibleMock} />
    );

    expect(getByText('123 Main St, Cityville')).toBeTruthy();
  });

  test('calls setAddressSheetVisible when "Edit address" is pressed', () => {
    const setAddressSheetVisibleMock = jest.fn();
    const address = {
      address: {
        line1: '123 Main St',
        city: 'Cityville',
      },
    };
    const { getByText } = render(
      <AddressCard address={address} setAddressSheetVisible={setAddressSheetVisibleMock} />
    );

    fireEvent.press(getByText('Edit address'));

    expect(setAddressSheetVisibleMock).toHaveBeenCalledWith(true);
  });
});
