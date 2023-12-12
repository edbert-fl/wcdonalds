import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { RootStackParamList } from "../utils/Types";
  import { StackNavigationProp } from "@react-navigation/stack";
  import AppHeader from "../components/AppHeader";
  import Icon from "react-native-vector-icons/MaterialIcons";
  import { theme } from "../utils/Styles";
  import { SelectList } from "react-native-dropdown-select-list";
  import { addDoc, collection, getDocs } from "firebase/firestore";
  import { FIRESTORE_DB } from "../../FirebaseConfig";
  import ConfirmAnimation from "../components/animations/ConfirmAnimation";
  
  const AddNewPromotion = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [promotionName, setPromotionName] = useState("");
    const [promotionArtURL, setPromotionArtURL] = useState("");
    const [promotionDescription, setPromotionDescription] = useState("");
  
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

    const handleAddPromotion = () => {
        throw("I haven't been implemented yet...")
    }
  
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
                style={styles.input}
                autoCapitalize="sentences"
                autoFocus
                enterKeyHint="done"
                onChangeText={(text) => setPromotionName(text)}
              />
            </View>

            <View style={styles.fieldContainer}>
            <Text style={styles.label}>Art URL</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="sentences"
              textContentType="URL"
              keyboardType="url"
              enterKeyHint="done"
              onChangeText={(text) => setPromotionArtURL(text)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.largeInput}
              autoCapitalize="sentences"
              returnKeyType="done"
              enterKeyHint="done"
              onChangeText={(text) => setPromotionDescription(text)}
              multiline
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
  
  export default AddNewPromotion;
  