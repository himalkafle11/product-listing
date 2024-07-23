import { Product } from "./product";

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  items: any;
  price:number;
  offPercent:number
}

export interface CartDetails {
  _id: string;
  orderId: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  subTotal: number;
  totalAmount: number;
  voucherCode: string;
  voucherAmount: number;
  deliveryAddress: string;
  deliveryCharge: number;
  isDeleted: boolean;
  items: CartItem[];
}
