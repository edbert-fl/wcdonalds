import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'Home': undefined;
    'AllProducts': undefined;
    'Login': undefined;
    'SignUp': undefined;
    'Admin': undefined;
    'Checkout': undefined;
    'Success': { successText: string , includeConfetti?: boolean, animation: "addToCart" | "confirm" | null};
    'AddNewProduct': undefined;
    'AddNewPromotion': undefined;
    'UserProfile': undefined
    'ProductDetails': { productID: string };
    'Category': { categoryID: string, categoryName: string };
    'Deals': { promotionID: string, promotionName: string };
    navigation: StackNavigationProp<RootStackParamList, 'AllProducts'>;
  };