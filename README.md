<a name="readme-top"></a>

<h1 align="center">WcDonald's Mobile App</h1>

<p align="center">
  <a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></a>
  <a href="https://reactnative.dev/"><img alt="React Native" src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></a>
  <a href="https://firebase.google.com/"><img alt="Firebase" src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase"></a>
  <a href="https://jestjs.io/"><img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"></a>
</p>


<!-- ABOUT THE PROJECT -->
## About The Project

Welcome to my side project – a fast food mobile app clone built with React Native and using TypeScript. This app promises a seamless and delightful culinary ordering experience for users on both iOS and Android devices.

At the core of this project is Firebase for user authentication and the database and many important aspects of the app were tested using Jest. This guarantees that the app not only meets but exceeds expectations, providing users with a reliable, responsive, and delightful ordering experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
# Getting Started

To get a local copy up and running follow these simple example steps.

## Prerequisites

### Node.js and npm

Make sure you have Node.js and npm installed on your machine. You can download them from https://nodejs.org/.

### React Native CLI

Install React Native CLI globally by running the following command:

```bash
npm install -g react-native-cli
```

## Installation

Clone the repository to your local machine using Git then navigate to the project directory.

```bash
git clone <repository_url>
cd <project_directory>
```

Then install the project dependencies using npm.
```bash
npm install
```
Open the Firebase configuration file in your code editor (e.g., FirebaseConfig.tsx). Then update the Firebase configuration with your own free Firebase project credentials. If you don't have a Firebase project, create one by following the instructions [here](https://docs.kii.com/en/samples/push-notifications/push-notifications-android-fcm/create-project/).

Delete the import statements from `@env` and replace the `firebaseConfig` with your own Firebase credentials:

```typescript
// Replace these import statements
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";

// With your Firebase credentials
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
  measurementId: 'your-measurement-id',
};
```
Save the changes to FirebaseConfig.tsx and then open your terminal or command prompt and run the following command:

```bash
npm run create-collections
```
This script will create necessary sample collections and documents for use in the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### User Authentication

<p align="center">
  <img src="https://github.com/edbert-fl/wcdonalds/assets/102503467/278e0c17-2281-4563-9fa8-a911fc83baa1" hspace="10" alt="Create Account GIF" align="center" width="200" />
</p>

The application features a versatile user authentication system powered by Firebase, allowing users to choose to create accounts for a personalized experience, log in seamlessly with existing credentials, or explore the app anonymously for instant access without mandatory sign-up. This flexibility caters to a diverse user base, prioritizing user-centric design and inclusivity.

In addition to enhancing user experience, the authentication system is underpinned by robust security measures kept up to date by Firebase, ensuring the safeguarding of user accounts and data.

```typescript
const signUp = async () => {
      /* Sets loading to be true to show activity indicator to show users their request is processing */
      setLoading(true);
      try {
          const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)

          /* Updates profile with the display name given by the user when creating accoounts. */
          await updateProfile(response.user, {displayName : displayName})
          console.log("Successfully created new user");
      } catch (error: any) {
          console.log(error);
          alert('Sign up failed: ' + error.message)
      } finally {
          /* Disables activity indicator */
          setLoading(false);
      }
  }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Adding to Cart

<p align="center">
  <img src="https://github.com/edbert-fl/wcdonalds/assets/102503467/9f6a2095-9c55-482f-abd9-0e1c020e80c3" hspace="10" alt="Add to Cart GIF" align="center" width="200" />
</p>

Adding items to cart is a key feature in many kinds of ordering platforms for enhancing user interaction and facilitating a rewarding shopping experience. Here in the code the logic handles various scenarios:

1. **Existing Item Update:**
   - If the fetched product matches an existing item in the cart, the function identifies the index of the duplicate item.
   - If the quantity is set to zero, indicating removal, the item is removed from the cart with a corresponding success message.
   - If the quantity is non-zero, the item's quantity is updated, and a success message is displayed.

2. **New Item Addition:**
   - If no duplicate item is found, the fetched product is added to the cart.
   - A success message is displayed, including optional visual enhancements like confetti animations.

3. **Error Handling:**
   - In case of any errors during the process, appropriate error messages are logged to aid in debugging.


```typescript
function handleAddToCart(productID: string, quantity: number) {
    console.log(
      "Cart: Adding to cart >>>",
      { productID, quantity },
      "\n"
    );

    fetchCartProduct(productID, quantity)
      .then((fetchedProduct) => {
        if (fetchedProduct) {
          const existingItemIndex = cart.findIndex(
            (item) => item.productID === productID
          );

          if (existingItemIndex !== -1) {
            console.log(
              "Cart: Duplicate item found."
            );
            if (quantity === 0) {
              console.log(
                "Cart: Removing item..."
              );
              let tempCart = [...cart];
              tempCart = tempCart.filter((_, index) => index !== existingItemIndex);
              setCart(tempCart);
              navigation.navigate('Success', { successText: "Item removed from cart.", includeConfetti: false, animation: null});
            } else {
              console.log(
                "Cart: Updating item quantity..."
              );
              let tempCart = [...cart];
              tempCart[existingItemIndex].quantity = quantity;
              setCart(tempCart);
              navigation.navigate('Success', { successText: "Item quantity updated!", includeConfetti: false, animation: null });
            }
          } else {
            console.log(
              "Cart: No duplicate item found. Adding item to cart..."
            );
            setCart((prevCart) => [...prevCart, fetchedProduct]);
            navigation.navigate('Success', { successText: "Item added to cart!", includeConfetti: true, animation: "addToCart" });
          }
        } else {
          console.error("Product not found or fetch failed.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Reorder from History

<p align="center">
  <img src="https://github.com/edbert-fl/wcdonalds/assets/102503467/91791068-e608-4913-9c1b-35ba74900059" hspace="10" alt="Reorder GIF" align="center" width="200" />
</p>

The `handleReorder` function is designed to streamline the reordering process of items from a previous order. Upon receiving the orderID as a parameter, the function initiates an asynchronous process to fetch the specific order document from the "orders" collection in the Firestore database then add all the items in that previous order to the user’s cart. This function allows users to recreate their preferred orders making the app more user-friendly and convenient.

```typescript
const handleReorder = async (orderID: string) => {
    let cartItems: CartItem[] = [];

    try {
      const ordersCollectionRef = collection(FIRESTORE_DB, "orders");
      const orderDocumentRef = doc(ordersCollectionRef, orderID);
      const orderDocument = await getDoc(orderDocumentRef);

      if (orderDocument.exists()) {
        const orderData = orderDocument.data();
        const orderItems = orderData.itemsInOrder;

        for (let i = 0; i < orderItems.length; i++) {
          const orderItem = orderItems[i]
          const productDocument = await getDoc(orderItem.orderedItem);

          if (productDocument.exists()) {
            const productData = productDocument.data() as Product;

            const cartItem: CartItem = {
              productID: productDocument.id,
              name: productData.name,
              description: productData.description,
              price: productData.price,
              image: productData.image,
              quantity: orderItem.orderQuantity,
            };

            cartItems.push(cartItem);
          }
        }
      }

      setCart(cartItems);
      navigation.navigate("Home");
      handleOpenCart();
    } catch (error: any) {
      console.error("Error handling reorder:", error.message);
    }
  };
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Sprint Backlogs

- [X] **Sprint 1**
  - [X] As a user looking to buy something, I want to be able to view all the items available for order to decide what I want.
  - [X] As a user looking to buy something, I want to be able to add items to my cart so that I can order them.
  - [X] As a user that is looking to change their order, I want to be able to edit my cart easily before confirming my order.
  - [X] As an admin, I want to be able to add new items so that other users will be able to order them.
  - [X] As a user that wants to use the app, I want to be able to create an account and login, to receive promotions and make orders.
- [X] **Sprint 2**
  - [X] As a user that wants to make an order once only, I want to be able to make an order without having to create an account or login to make it more convenient.
  - [X] As an admin, I want to be able to create promotions with their own promotion art so that it looks more attractive to customers.
  - [X] As a user that wants to search for food items quickly, I want to be able to search for food items and filter by category.
  - [X] As someone who has a lot of repeat orders I want to be able to view my order history and copy it directly into my cart to save time.
  - [X] As an admin, I want to be able to add new products from an admin only dashboard so that I can manage the menu.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Edbert Felix Lim - edbert.fl@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev/
[Firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
