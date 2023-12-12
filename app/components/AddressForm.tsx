import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import {
  StripeProvider,
  AddressSheet,
  AddressSheetError,
  AddressDetails,
} from "@stripe/stripe-react-native";
import { useCart } from "./CartContext";

interface AddressFormProps { 
    addressSheetVisible: boolean,
    setAddressSheetVisible: (addressSheetVisible: boolean) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ addressSheetVisible, setAddressSheetVisible}) => {
  const { address, setAddress } = useCart();

  const closeAddressSheet = () => {
    setAddressSheetVisible(false);
  }

  function handleAddressFormSubmit(addressDetails: AddressDetails) {
    closeAddressSheet();
    setAddress(addressDetails);
    console.log(address)
  }

  return (
    <StripeProvider publishableKey="pk_test_51OLi9NBXTkgpeHauX2lreJTh4jHBZt76XK5CjfdkYAj5c78DVAjfDPdJ65w6S7ZPhr1hxRhPgVRihLDOj4YgOTwd00gTTLqlgf">
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
    </StripeProvider>
  );
};

export default AddressForm;
