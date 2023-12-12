import {
  View,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/Styles";
import { SpeedDial } from "@rneui/themed";

const AdminDashboard = () => {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigateToNewProduct = () => {
    navigation.navigate("Add New Product");
    setAddMenuOpen(false);
  }

  const handleNavigateToNewPromotion = () => {
    navigation.navigate("Add New Promotion");
    setAddMenuOpen(false);
  }

  return (
    <View style={{ height: "90%" }}>
      <SpeedDial
        isOpen={addMenuOpen}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setAddMenuOpen(!addMenuOpen)}
        onClose={() => setAddMenuOpen(!addMenuOpen)}
        color={theme.colors.primary}
      >
        <SpeedDial.Action
          icon={<Icon name="fastfood" size={22} color={theme.colors.buttonText} />}
          title="Add Product"
          onPress={handleNavigateToNewProduct}
          color={theme.colors.accent}
        />
        <SpeedDial.Action
          icon={<Icon name="local-offer" size={22} color={theme.colors.buttonText} />}
          title="Add Promotion"
          onPress={handleNavigateToNewPromotion}
          color={theme.colors.accent}
        />
      </SpeedDial>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default AdminDashboard;
