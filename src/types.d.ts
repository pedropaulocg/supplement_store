export type Category = "Vitamins" | "Protein" | "Pre-workout" | "Pre-bed" | "Other";
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  stock: number;
  smug: string;
  bestseller: boolean;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}