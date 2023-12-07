export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }

export interface CartItem {
    productID: string;
    orderQty: number;
}