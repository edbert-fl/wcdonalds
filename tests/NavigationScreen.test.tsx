import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react-native";
import NavigationScreen from "../app/screens/NavigationScreen";
import "core-js";

describe("NavigationScreen", () => {
  const mockProps = {
    admin: false,
    menuVisible: true,
    setMenuVisible: jest.fn(),
    handleSignOut: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByText } = render(<NavigationScreen {...mockProps} />);

    expect(getByText("Home")).toBeTruthy();
    expect(getByText("My Profile")).toBeTruthy();
    expect(getByText("Our Menu")).toBeTruthy();
    expect(getByText("Logout")).toBeTruthy();
  });

  it("calls setMenuVisible on close button press", () => {
    const { getByTestId, getByLabelText } = render(
      <NavigationScreen {...mockProps} />
    );
    fireEvent.press(getByTestId("CloseButton"));

    expect(mockProps.setMenuVisible).toHaveBeenCalledWith(false);
  });
});
