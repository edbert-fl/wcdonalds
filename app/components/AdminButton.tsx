import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/TypesUtils";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/StylesUtils";
import { SpeedDial } from "@rneui/themed";

const AdminButton = () => {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigateToNewProduct = () => {
    navigation.navigate("AddNewProduct");
    setAddMenuOpen(false);
  };

  const handleNavigateToNewPromotion = () => {
    navigation.navigate("AddNewPromotion");
    setAddMenuOpen(false);
  };

  return (
    <SpeedDial
      isOpen={addMenuOpen}
      icon={{ name: "add", color: "#fff" }}
      style={{zIndex: 999}}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setAddMenuOpen(!addMenuOpen)}
      onClose={() => setAddMenuOpen(!addMenuOpen)}
      color={theme.colors.primary}
    >
      <SpeedDial.Action
        icon={
          <Icon name="fastfood" size={22} color={theme.colors.buttonText} />
        }
        title="Add Product"
        onPress={handleNavigateToNewProduct}
        color={theme.colors.accent}
      />
      <SpeedDial.Action
        icon={
          <Icon name="local-offer" size={22} color={theme.colors.buttonText} />
        }
        title="Add Promotion"
        onPress={handleNavigateToNewPromotion}
        color={theme.colors.accent}
      />
    </SpeedDial>
  );
};

export default AdminButton;
