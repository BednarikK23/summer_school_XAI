import { RequestPagination } from './request';
import { Wine } from './wine';

export type OrderItem = {
  wine: Wine;
  quantity: number;
};

export type CustomerInfo = {
  fullName: string;
  phoneNumber: string;
  email: string;
};

export type Order = {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  customerName: string;
  contactPhone: string;
  contactEmail: string;
  pickupDateFrom?: string;
  pickupDateTo?: string;
  vinaryId: string;
  createdAt: string;
  items: {
    id: string;
    orderId: string;
    wineId: string;
    quantity: number;
    unitPrice: number;
  }[];
};

export type OrderCreate = {
  vinaryId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  pickupDateFrom: string;
  pickupDateTo: string;
  items: {
    wineId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
};

export type OrderEdit = {
  status: string;
  pickupDateFrom: string;
  pickupDateTo: string;
};

export type OrderPaginated = RequestPagination & {
  winery?: string;
  status?: string;
};
