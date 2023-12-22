import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddToCartButton from "../app/components/AddToCartButton";
import '@react-navigation/native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "app/components/AppNavigator";

describe("AddToCartButton Component", () => {
  jest.mock("../app/components/AddToCartButton", () => ({
    fetchCartProduct: jest.fn().mockImplementation(() => ({
      productID: "123",
      name: "Test Product",
      description: "Test Description",
      price: 10.99,
      image: "test-image-url",
      quantity: 1,
    })),
  }));

  test("renders correctly with Add to Cart button", async () => {
    const { getByText } = render(
        <AddToCartButton productID="123" quantity={1} />
    );
    const addToCartButton = getByText("Add to Cart");
    fireEvent.press(addToCartButton);

    expect(addToCartButton).toBeTruthy();
  });
});
