export interface CreateOrderRequest {
  vinaryId: string;
  items: {
    wineId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  fullName: string;
  pickupDateFrom?: string | undefined;
  pickupDateTo?: string | undefined;
  phoneNumber: string;
  email: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCvv: string;
  cardHolder: string;
}

export interface UpdateOrderStatusRequest {
  orderId: string;
  status: string;
  pickupDateFrom: string;
  pickupDateTo: string;
}

export interface GetOrderByIdRequest {
  orderId: string;
}

export interface DeleteOrderRequst {
  orderId: string;
}

export interface GetAllOrderItemsRequest {
  orderId: string;
}
