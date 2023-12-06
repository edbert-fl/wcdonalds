import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'All Products': undefined; // Assuming this is your initial screen
    'Product Details': { productId: string };
    navigation: StackNavigationProp<RootStackParamList, 'All Products'>;
  };
  