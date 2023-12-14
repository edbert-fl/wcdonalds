import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../utils/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/Styles";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import FormErrorMessage from "../components/FormErrorMessage";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import ConfirmAnimation from "../components/animations/ConfirmAnimation";
import { PromotionProduct } from "../utils/Interface";

const AddNewPromotion = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State variables
  const [promotionName, setPromotionName] = useState("");
  const [promotionArtURL, setPromotionArtURL] = useState("");
  const [promotionDescription, setPromotionDescription] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [data, setData] = useState<PromotionProduct[]>([]);

  // State variables for form validation
  const [invalidName, setInvalidName] = useState(false);
  const [invalidProducts, setInvalidProducts] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidFormSubmission, setInvalidFormSubmission] = useState(false);

  // Array to store products fetched from Firestore
  let tempData: PromotionProduct[] = [];

  useEffect(() => {
    // Fetch products data from Firestore on component mount
    const fetchData = async () => {
      try {
        const productQuerySnapshot = await getDocs(
          collection(FIRESTORE_DB, "products")
        );
        productQuerySnapshot.forEach((productDoc) => {
          tempData.push({ key: productDoc.id, value: productDoc.data().name });
        });

        setData(tempData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to check if a value is empty
  function checkIfEmpty(
    value: any | null,
    setErrorValue: (arg0: boolean) => void
  ) {
    if (value === null) {
      setErrorValue(true);
      setInvalidFormSubmission(true);
      return;
    }

    if (typeof value === "string" || Array.isArray(value)) {
      if (value.length === 0) {
        setErrorValue(true);
        setInvalidFormSubmission(true);
      } else {
        setErrorValue(false);
      }
    }
  }

  // Function to handle adding a new promotion
  const handleAddPromotion = async () => {
    // Reset form submission error state
    setInvalidFormSubmission(false);
  
    // Validate form fields
    checkIfEmpty(selectedProducts, setInvalidProducts);
    checkIfEmpty(promotionArtURL, setInvalidURL);
    checkIfEmpty(promotionDescription, setInvalidDescription);
    checkIfEmpty(promotionName, setInvalidName);
    checkIfEmpty(rate, setInvalidRate);
  
    // If the form is valid, proceed with adding the promotion
    if (!invalidFormSubmission) {
      try {
        // Add a new promotion and get its ID
        const newPromotionID = await addPromotion();
  
        if (newPromotionID != null) {
          // Reference to the new promotion document
          const promotionDocReference = doc(FIRESTORE_DB, "promotions", newPromotionID);
  
          // Fetch the promotion document snapshot
          const promotionDocSnapshot = await getDoc(promotionDocReference);
  
          // Check if the promotion document exists
          if (promotionDocSnapshot.exists()) {
            // Retrieve the rate from the promotion document
            const rate = promotionDocSnapshot.data().rate;
  
            // Update each selected product with a reference to the new promotion and discounted price
            for (let i in selectedProducts) {
              const productId = selectedProducts[i];
              const productDocReference = doc(FIRESTORE_DB, "products", productId);
  
              try {
                // Fetch the product document snapshot
                const productDocSnapshot = await getDoc(productDocReference);
  
                // Check if the product document exists
                if (productDocSnapshot.exists()) {
                  // Retrieve the product price from the document
                  const productPrice = productDocSnapshot.data().price;
  
                  // Calculate the discounted price based on the rate
                  const discountPrice = productPrice * rate;
  
                  // Update the product document with a reference to the new promotion and discounted price
                  await updateDoc(productDocReference, {
                    promotion: promotionDocReference,
                    discountPrice: discountPrice,
                  });
  
                  console.log("Document successfully updated!");
                } else {
                  console.log("Error: Could not retrieve product document snapshot for product ID:", productId);
                }
              } catch (error) {
                console.error("Error updating product document:", error);
              }
            }
          } else {
            console.log("Error: Promotion document does not exist.");
          }
        }
      } catch (error) {
        console.error("Error adding promotion:", error);
      }
    };
  

    // Navigate to the success screen after adding the promotion
    navigation.navigate("Success", {
      successText: "Successfully added promotion!",
      includeConfetti: false,
      animation: <ConfirmAnimation />,
    });
  };

  // Function to add a new promotion to Firestore
  const addPromotion = async () => {
    try {
      const newPromotion = {
        art: promotionArtURL,
        description: promotionDescription,
        name: promotionName,
        rate: rate,
      };

      // Add the new promotion to the 'promotions' collection in Firestore
      const docRef = await addDoc(
        collection(FIRESTORE_DB, "promotions"),
        newPromotion
      );
      console.log("Product document added.");
      console.log("Assigning products to promotion with ID:", docRef.id, "...");

      return docRef.id;
    } catch (error) {
      console.error("Error adding promotion document:", error);

      return null;
    }
  };

  /**
   * Updates the 'rate' state based on the input text and performs
   * validation to ensure the value is a valid float between 0 and 1.
   * If the input is valid, updates the state and clears any validation error.
   *
   * @param {string} text - The input text to be converted to a float.
   */
  const updateRate = (text: string) => {
    const inputValue = parseFloat(text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 1) {
      setRate(inputValue);
      setInvalidRate(false);
    } else {
      console.log("Invalid", invalidRate);
      setInvalidRate(true);
    }
  };

  // Function to handle the selection of products in the dropdown
  const handleSelection = (selectedItems: any) => {
    console.log(selectedProducts);
    setInvalidProducts(false);
    setSelectedProducts(selectedItems);
  };

  // JSX for the component's UI
  return (
    <View>
      <AppHeader
        title="Add New Promotion"
        onBackPress={() => navigation.goBack()}
        onBackIcon={
          <Icon
            name="arrow-back-ios"
            size={20}
            color={theme.colors.buttonText}
          />
        }
      />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 30 }} />
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Promotion Name</Text>
            <TextInput
              style={[styles.input, invalidName && styles.inputError]}
              autoCapitalize="sentences"
              autoFocus
              enterKeyHint="done"
              onChangeText={(text) => setPromotionName(text)}
            />
            <FormErrorMessage
              visible={invalidName}
              message={"Name cannot be empty!"}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Products in Promotion</Text>
            <MultipleSelectList
              boxStyles={[
                styles.dropdown,
                invalidProducts && styles.dropdownError,
              ]}
              searchPlaceholder="Search for products"
              setSelected={(key: any) => setSelectedProducts(key)}
              onSelect={() => console.log(selectedProducts)}
              data={data}
              save="key"
            />
            <FormErrorMessage
              visible={invalidURL}
              message={"At least one product needs to be selected!"}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Art URL</Text>
            <TextInput
              style={[styles.input, invalidURL && styles.inputError]}
              autoCapitalize="sentences"
              textContentType="URL"
              keyboardType="url"
              enterKeyHint="done"
              onChangeText={(text) => setPromotionArtURL(text)}
            />
            <FormErrorMessage
              visible={invalidURL}
              message={"Promotion Art URL cannot be empty!"}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[
                styles.largeInput,
                invalidDescription && styles.inputError,
              ]}
              autoCapitalize="sentences"
              returnKeyType="done"
              enterKeyHint="done"
              onChangeText={(text) => setPromotionDescription(text)}
              multiline
            />
            <FormErrorMessage
              visible={invalidDescription}
              message={"Promotion Description cannot be empty!"}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Rate</Text>
            <TextInput
              style={[styles.input, invalidRate && styles.inputError]}
              keyboardType="numeric"
              enterKeyHint="done"
              onChangeText={(text) => updateRate(text)}
            />
            <FormErrorMessage
              visible={invalidRate}
              message={"Rate must be between 0 and 1!"}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAddPromotion}>
            <Text style={styles.buttonText}>Add Promotion</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  fieldContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.placeholderText,
    padding: 10,
    marginTop: 10,
    backgroundColor: theme.colors.surface,
    fontSize: 16,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  largeInput: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.placeholderText,
    padding: 10,
    marginTop: 10,
    backgroundColor: theme.colors.surface,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.placeholderText,
    padding: 10,
    marginTop: 10,
    backgroundColor: theme.colors.surface,
    color: theme.colors.placeholderText,
    fontSize: 16,
  },
  dropdownError: {
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
});

export default AddNewPromotion;
