import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'Home': undefined;
    'AllProducts': undefined;
    'Login': undefined;
    'Admin': undefined;
    'Checkout': undefined;
    'Success': { successText: string , includeConfetti?: boolean, animation: React.ReactNode};
    'AddNewProduct': undefined;
    'AddNewPromotion': undefined;
    'ProductDetails': { productID: string };
    'Category': { categoryID: string };
    navigation: StackNavigationProp<RootStackParamList, 'AllProducts'>;
  };
  