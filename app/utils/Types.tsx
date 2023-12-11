import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'All Products': undefined;
    'Login': undefined;
    'Admin': undefined;
    'Success': { successText: string , includeConfetti?: boolean, animation: React.ReactNode};
    'Add New Product': undefined;
    'Product Details': { productID: string };
    navigation: StackNavigationProp<RootStackParamList, 'All Products'>;
  };
  