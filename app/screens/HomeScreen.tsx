import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import {
  Product,
  Promotion,
  PromotionImages,
  Category,
} from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/TypesUtils";
import { SearchBar } from "react-native-elements";
import SearchScreen from "./SearchScreen";
import { MainHeader } from "../components/MainHeader";

export const HomeScreen: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [promotionImages, setPromotionImages] = useState<PromotionImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchPageVisible, setSearchPageVisible] = useState(false);
  const [search, setSearch] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promotionCollection = collection(FIRESTORE_DB, "promotions");
        const promotionsSnapshot = await getDocs(promotionCollection);
        const fetchedPromotions: Promotion[] = promotionsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            art: doc.data().art,
            description: doc.data().description,
            name: doc.data().name,
            rate: doc.data().rate,
          })
        );
        let promotionImages: PromotionImages[] = [];
        for (let i in fetchedPromotions) {
          promotionImages.push({
            id: fetchedPromotions[i].id,
            art: fetchedPromotions[i].art,
          });
        }

        setPromotions(fetchedPromotions);
        setPromotionImages(promotionImages);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(FIRESTORE_DB, "category");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const fetchedCategories: Category[] = categoriesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            name: doc.data().name,
            art: doc.data().art,
          })
        );

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
    fetchCategories();
  }, []);

  const handleGoToMenu = () => {
    navigation.navigate("AllProducts");
  };

  const handleOpenSearchPage = () => {
    setSearchPageVisible(true);
  };

  const handleCloseSearchPage = () => {
    setSearchPageVisible(false);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.valueOf() === "" || search.valueOf() === "") {
      handleCloseSearchPage();
    } else {
      handleOpenSearchPage();
    }
  };

  const handleCategoryCardPress = (categoryID: string) => {
    navigation.navigate("Category", { categoryID });
  };

  return (
    <View>
      <MainHeader title="WcDonald's" />
      {/* { isAdmin(authUser.uid) ? (
        <AdminButton/>
      ) : (
        null
      )} */}
      <ScrollView contentContainerStyle={styles.background}>
        <SearchBar
          onChangeText={handleSearchChange}
          value={search}
          onPressIn={handleOpenSearchPage}
          platform="ios"
          inputStyle={{ backgroundColor: theme.colors.search }}
          onBlur={handleCloseSearchPage}
          onClear={handleCloseSearchPage}
          inputContainerStyle={{ backgroundColor: theme.colors.search }}
        />
        <SearchScreen
          visible={searchPageVisible}
          setVisible={setSearchPageVisible}
          search={search}
          setSearch={setSearch}
        />
        <Text style={styles.heading}>Your Deals</Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <View style={styles.promotionalArtContainer}>
            {promotionImages.map((promotionImage) => {
              return (
                <Image
                  key={promotionImage.id}
                  source={{ uri: promotionImage.art }}
                  style={styles.promotionalArt}
                />
              );
            })}
          </View>
        </View>
        <Text style={styles.heading}>Our Menu</Text>
        <View style={styles.categories}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            { categories.length === 0 ? (
              <View style={{flexDirection: 'row'}}>
                <View style={styles.categoryPlaceholder}/>
                <View style={styles.categoryPlaceholder}/>
                <View style={styles.categoryPlaceholder}/>
                <View style={styles.categoryPlaceholder}/>
              </View>
            ) : (categories.map((category) => {
              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryCardPress(category.id)}
                >
                  <View key={category.id} style={styles.category}>
                    <Text style={styles.categoryLabel}>{category.name}</Text>
                    <Image
                      source={{ uri: category.art }}
                      style={styles.categoryImage}
                    />
                  </View>
                </TouchableOpacity>
              );
            }))}
            <View style={styles.categoryScrollEnd}>
              <TouchableOpacity onPress={handleGoToMenu}>
                <View style={styles.categoryScrollEndCircle}>
                  <Icon
                    style={{ alignSelf: "center" }}
                    name="arrow-forward"
                    size={50}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.categoryScrollEndText}>Full Menu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  promotionalArtContainer: {
    width: "95%",
    height: 200,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: theme.colors.imagePlaceholder,
  },
  promotionalArt: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 20,
    color: theme.colors.text,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    overflow: "visible",
    height: 220,
  },
  category: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.accent,
    top: 0,
    overflow: "visible",
  },
  categoryPlaceholder: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.imagePlaceholder,
    top: 0,
  },
  categoryScrollEnd: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    marginRight: 30,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  categoryScrollEndCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  categoryScrollEndText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  categoryImage: {
    width: 190,
    height: "100%",
  },
  categoryLabel: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: theme.colors.buttonText,
    fontSize: 20,
  },
});

export default HomeScreen;