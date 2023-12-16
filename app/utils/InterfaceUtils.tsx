import { DocumentReference, Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discountPrice: number | null;
  }

export interface CartItem {
  productID: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItem {
  orderQuantity: number;
  orderedItem: DocumentReference;
}

export interface Order {
  orderID: string;
  itemsInOrder: OrderItem[];
  orderValue: number;
  orderedAt: Timestamp;
  orderedBy: string;
}

export interface Promotion {
  id: string;
  art: string;
  description: string;
  name: string;
  rate: number;
}

export interface PromotionProduct {
  key: string;
  value: string;
}

export interface PromotionImages {
  id: string,
  art: string
}

export interface Category {
  id: string,
  name: string,
  art: string
}