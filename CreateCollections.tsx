import { initializeApp, FirebaseApp } from "firebase/app";
import { Firestore, doc, setDoc, getDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_APP } from "./FirebaseConfig";

const firestoreSchema: FirestoreCollection[] = [
    {
        collectionName: "category",
        documents: {
            "burgers": {
                art: "https://www.mcdonalds.com.sg/sites/default/files/2023-02/1200x1200_MOP_BBPilot_McSpicyDbl.png",
                name: "Burgers"
            },
            "desserts": {
                art: "https://www.mcdonalds.com.sg/sites/default/files/2022-02/OREO%20McFlurry.png",
                name: "Desserts"
            },
            "light bites": {
                art: "https://www.mcdonalds.com.sg/sites/default/files/2021-09/Fresh%20Fries_0.png",
                name: "Light Bites"
            }
      }
    },
    {
        collectionName: "products",
        documents: {
        "1LVSXv3wJCGngalVDqhN": {
          name: "WcFlurry",
          category:
            "category/desserts",
          description:
            "Indulge in pure bliss with our WcFlurry – a heavenly fusion of rich, velvety ice cream and decadent Oreo goodness. Satisfy your sweet cravings with each creamy spoonful, as the iconic Oreo flavor dances on your taste buds. Treat yourself to a moment of pure delight – because dessert should always be this irresistible.",
          discountPrice: 2,
          image:
            "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/FDl81RM1TWZlsJEmONK0.webp",
          price: 3.99,
        },
        "8OSidf59KlAOozsuXiGo": {
            name: "Cheese Burger",
            category:
              "category/burgers",
            description:
              "Savor perfection with our classic cheeseburger: a juicy beef patty, melted cheese, and fresh toppings in a soft bun—a mouthwatering symphony of flavors in every bite!",
            image:
              "https://s7d1.scene7.com/is/image/mcdonalds/mcd-chicken-burger-qa1122:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
            price: 5.99,
        },
        "Y5v3SEGAor0TzNwrz2ae": {
            name: "French Fries",
            category:
              "category/light bites",
            description:
              "Savor the crispy perfection of our French Fries – a symphony of golden-brown goodness that will elevate your taste experience. Delight in the satisfying crunch and fluffy interior of each fry, seasoned to perfection for an irresistible flavor explosion. Whether paired with your favorite dipping sauce or enjoyed solo, our French Fries are a crispy delight that turns any moment into a delectable celebration. Treat yourself to the ultimate fry experience – because every bite should be a delight.",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBVUZ10MQYTTDKFxyAJLIQ5deoydbN1cpCA&usqp=CAU",
            price: 2.49,
        },
        "bUx6ePMH55o0YPsVbbON": {
            name: "Chicken Burger",
            category:
              "category/burgers",
            description:      
              "Indulge in the ultimate cheeseburger experience: succulent beef, melted cheddar, all in a perfect, toasted bun. Pure satisfaction in every bite!",
            image:
              "https://s7d1.scene7.com/is/image/mcdonalds/mcd-cheeseburger-uae-0523-v2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
            price: 5.99,
        },
      },
    },
    {
        collectionName: "orders",
        documents: {
          "3ElCRWcA1rsMJ9UqswrR": {
            orderQuantity: 10,
            itemsInOrder: [{
                orderQuantity: 10,
                orderedItem: "products/1LVSXv3wJCGngalVDqhN"
            }], 
            orderValue: 39.99,
            orderedAt: new Date("December 15, 2023 21:47:35 GMT+0700"),
            orderedBy: "j8ivZOy67cZMRFYcNpPw0AfldYm2",
          },
        },
    },
    {
        collectionName: "promotions",
        documents: {
            "V6OpDZY0hVjLiId7TbzF": {
                art: "https://www.mashed.com/img/gallery/the-untold-truth-of-mcdonalds-mcflurry/intro-1551716950.jpg",
                description: "Get 2 WcFlurries for the price of 1!",
                name: "WcFlurry50",
                rate: 0.5
            }
        }
    }
]

interface CollectionDocument {
  [key: string]: any;
}

interface FirestoreCollection {
  collectionName: string;
  documents: CollectionDocument;
}

async function createFirestoreCollections() {
  try {
    for (const collectionData of firestoreSchema) {
      const { collectionName, documents } = collectionData;
      const collectionRef = collection(FIRESTORE_DB, collectionName);

      // To prevent pulling all data from the colleciton if it exists.
      const collectionLimitQuery = query(collectionRef, limit(1));
      const collectionSnapshot = await getDocs(collectionLimitQuery);
      
      if (collectionSnapshot.docs.length === 0) {
        // Create documents in the collection
        for (const [documentId, documentData] of Object.entries(documents)) {
          const documentRef = doc(collectionRef, documentId);
          await setDoc(documentRef, documentData);
          console.log(`Document '${documentId}' in '${collectionName}' created successfully.`);
        }
      } else {
        console.log(`Collection '${collectionName}' already exists.`);
      }
    }

    console.log('Script execution completed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

createFirestoreCollections();
