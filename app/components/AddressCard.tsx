import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AddressDetails } from "@stripe/stripe-react-native";
import { theme } from "../utils/Styles";

interface AddressCardProps {
  address: AddressDetails;
  setAddressSheetVisible: (addressSheetVisible: boolean) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, setAddressSheetVisible }) => {
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.addressContainer}>
        <Text style={styles.title}>Address</Text>
        {Object.entries(address).length === 0 ? (
          <Text>No address saved</Text>
        ) : (
          <Text style={styles.address}>
            {address.address?.line1}, {address.address?.city}
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => setAddressSheetVisible(true)}>
          <Text>Edit address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  address: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 10,
  },
  addressContainer: {
    flex: 1,
    marginLeft: 15,
  },
});

export default AddressCard;
