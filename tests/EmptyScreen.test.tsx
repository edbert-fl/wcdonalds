import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyScreen } from "../app/screens/EmptyScreen";

describe("EmptyScreen", () => {
  test("renders text correctly", () => {
    const { getByText, getByTestId } = render(
      <EmptyScreen icon="shoppingCart" text="Test Message" />
    );

    const text = getByText("Test Message");

    expect(text).toBeTruthy();
  });

  test("displays correct icon for shoppingCart", () => {
    const { getByTestId } = render(
      <EmptyScreen icon="shoppingCart" text="Your shopping cart is empty" />
    );

    const icon = getByTestId("shoppingCartIcon");

    expect(icon).toBeTruthy();
  });

  test("displays correct icon for empty", () => {
    const { getByTestId } = render(
      <EmptyScreen icon="empty" text="No items to display" />
    );

    const icon = getByTestId("emptyIcon");

    expect(icon).toBeTruthy();
  });
});
