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

const AddProductScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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
          console.log(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  const handleAddProduct = async () => {
    try {
        const newProduct = {
            category: category,
            description: description,
            image: imageURL,
            name: productName,
            price: parseFloat(price), 
          };

        const docRef = await addDoc(collection(FIRESTORE_DB, 'products'), newProduct);
        console.log('Product document added with ID:', docRef.id);
        navigation.navigate('Success', { successText: "Product added to menu!", includeConfetti: false, animation: "confirm" });
      } catch (error) {
        console.error('Error adding product document:', error);
      }
  }

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 30 }} />
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              autoFocus
              enterKeyHint="done"
              onChangeText={(text) => setProductName(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Category</Text> 
            <SelectList
            boxStyles={styles.dropdown}
            searchPlaceholder="Search for category"
            setSelected={setCategory}
            data={data}
            save="value"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product Image URL</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              textContentType="URL"
              keyboardType="url"
              enterKeyHint="done"
              onChangeText={(text) => setImageURL(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              enterKeyHint="done"
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Product Description</Text>
            <TextInput
              style={styles.largeInput}
              autoCapitalize="sentences"
              returnKeyType="done"
              enterKeyHint="done"
              onChangeText={(text) => setDescription(text)}
              multiline
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
});

export default AddProductScreen;
