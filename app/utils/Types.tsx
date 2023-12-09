import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'All Products': undefined;
    'Success': { successText?: string | null };
    'Product Details': { productID: string };
    navigation: StackNavigationProp<RootStackParamList, 'All Products'>;
  };
  