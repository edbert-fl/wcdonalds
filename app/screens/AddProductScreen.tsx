import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../utils/TypesUtils";
import { StackNavigationProp } from "@react-navigation/stack";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/StylesUtils";
import { SelectList } from "react-native-dropdown-select-list";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import FormErrorMessage from "../components/FormErrorMessage";

const AddProductScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidCategory, setInvalidCategory] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidPriceValue, setInvalidPriceValue] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  interface Category {
    key: number;
    value: string;
  }

  let data: Category[] = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "category")
        );
        let i = 0;
        querySnapshot.forEach((doc) => {
          i++;
          data.push({ key: i, value: doc.data().name });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function checkIfValid(
    value: any | null,
    setErrorValue: (arg0: boolean) => void
  ) {
    if (value === null) {
      // Invalid submission
      setErrorValue(true);
      return false;
    }

    if (typeof value === "string" || Array.isArray(value)) {
      if (value.length === 0) {
        // Invalid submission
        setErrorValue(true);
        return false;
      } else {
        // Valid submission
        setErrorValue(false);
        return true;
      }
    }
    // Valid submission
    setErrorValue(false);
    return true;
  }

  const checkValidPrice = (price: number) => {
    try {
      if (price <= 0) {
        setInvalidPriceValue(true)
        return false;
      }
    } catch {
      setInvalidPriceValue(true)
      return false;
    } finally { 
      return true;
    }
  };

  const checkFields = async () => {
    const validName = checkIfValid(productName, setInvalidName);
    const validCategory = checkIfValid(category, setInvalidCategory);
    const validURL = checkIfValid(imageURL, setInvalidURL);
    const validPrice = checkIfValid(price, setInvalidPrice);
    const validDescription = checkIfValid(description, setInvalidDescription);
    const validPriceValue = checkValidPrice(parseFloat(price));

    return (
      validName &&
      validCategory &&
      validURL &&
      validPrice &&
      validDescription &&
      validPriceValue
    );
  };

  const handleAddProduct = async () => {
    let validFormSubmission = await checkFields();

    if (validFormSubmission) {
      try {
        const newProduct = {
          category: category,
          description: description,
          image: imageURL,
          name: productName,
          price: parseFloat(price),
        };

        const docRef = await addDoc(
          collection(FIRESTORE_DB, "products"),
          newProduct
        );
        console.log("Product document added with ID:", docRef.id);
        navigation.navigate("Success", {
          successText: "Product added to menu!",
          includeConfetti: false,
          animation: "confirm",
        });
      } catch (error) {
        console.error("Error adding product document:", error);
      }
    }
  };

  return (
    <View>
      <AppHeader
        title="Add New Product"
        onBackPress={() => navigation.goBack()}
        onBackIcon={
          <Icon
            name="arrow-back-ios"
            size={20}
            color={theme.colors.buttonText}
          />
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 30 }} />
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product</Text>
            <TextInput
              style={[styles.input, invalidName && styles.inputError]}
              placeholder="Product"
              autoCapitalize="sentences"
              autoFocus
              enterKeyHint="done"
              onChangeText={(text) => setProductName(text)}
            />
            <FormErrorMessage
              visible={invalidName}
              message={"Product name cannot be empty!"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Category</Text>
            {invalidCategory ? (
              <SelectList
                placeholder="Select Category"
                boxStyles={styles.dropdownError}
                searchPlaceholder="Search for category"
                setSelected={setCategory}
                data={data}
                save="value"
              />
            ) : (
              <SelectList
                placeholder="Select Category"
                boxStyles={styles.dropdown}
                searchPlaceholder="Search for category"
                setSelected={setCategory}
                data={data}
                save="value"
              />
            )}
            <FormErrorMessage
              visible={invalidCategory}
              message={"Please select a category!"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product Image URL</Text>
            <TextInput
              style={[styles.input, invalidURL && styles.inputError]}
              placeholder="Product Image URL"
              autoCapitalize="sentences"
              textContentType="URL"
              keyboardType="url"
              enterKeyHint="done"
              onChangeText={(text) => setImageURL(text)}
            />
            <FormErrorMessage
              visible={invalidURL}
              message={"Please add a product image!"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="Price"
              style={[styles.input, invalidPrice && styles.inputError]}
              keyboardType="numeric"
              enterKeyHint="done"
              onChangeText={(text) => setPrice(text)}
            />
            <FormErrorMessage
              visible={invalidPrice}
              message={"Price cannot be empty!"}
            />

            <FormErrorMessage
              visible={invalidPriceValue}
              message={"Price must be greater than 0!"}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product Description</Text>
            <TextInput
              placeholder="Product Description"
              style={[
                styles.largeInput,
                invalidDescription && styles.inputError,
              ]}
              autoCapitalize="sentences"
              returnKeyType="done"
              enterKeyHint="done"
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            <FormErrorMessage
              visible={invalidDescription}
              message={"Description cannot be empty!"}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

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

export default AddProductScreen;
