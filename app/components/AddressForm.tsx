import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import {
  AddressSheet,
  AddressSheetError,
  AddressDetails,
} from "@stripe/stripe-react-native";
import { useAppContext  } from "./AppContext";

interface AddressFormProps { 
    addressSheetVisible: boolean,
    setAddressSheetVisible: (addressSheetVisible: boolean) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ addressSheetVisible, setAddressSheetVisible}) => {
  const { address, setAddress } = useAppContext();

  const closeAddressSheet = () => {
    setAddressSheetVisible(false);
  }

  function handleAddressFormSubmit(addressDetails: AddressDetails) {
    closeAddressSheet();
    setAddress(addressDetails);
    console.log(address)
  }

  return (
      <AddressSheet
        appearance={{
          colors: {
            primary: "#F8F8F2",
            background: "#272822",
          },
        }}
        defaultValues={{
          phone: "123-456-7890",
          address: {
            country: "Australia",
            city: "Sydney",
            state: "New South Wales",
          },
        }}
        additionalFields={{
          phoneNumber: "required",
        }}
        allowedCountries={["AU"]}
        primaryButtonTitle={"Use this address"}
        sheetTitle={"Shipping Address"}
        googlePlacesApiKey={"(optional) YOUR KEY HERE"}
        visible={addressSheetVisible}
        onSubmit={async (addressDetails) => {
          console.log(addressDetails);
          handleAddressFormSubmit(addressDetails);
        }}
        onError={(error) => {
          if (error.code === AddressSheetError.Failed) {
            Alert.alert("There was an error.", "Check the logs for details.");
            console.log(error?.localizedMessage);
          }
          closeAddressSheet();
        }}
      />
  );
};

export default AddressForm;
