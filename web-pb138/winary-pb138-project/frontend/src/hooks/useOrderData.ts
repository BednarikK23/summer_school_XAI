import useLocalStorage from '@rehooks/local-storage';
import { useCallback } from 'react';
import { OrderItem } from '../models/order';

type OrderData = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  products: OrderItem[];
  totalAmount?: number;
  wineryId?: string;
  status: string;
  pickUpDateFrom?: string;
  pickUpDateTo?: string;
};

const ORDER_DATA_DEFAULT: OrderData = {
  status: 'PENDING',
  products: [],
};

const useOrderData = () => {
  const [orderData, setOrderData] = useLocalStorage<OrderData>('orderData', {
    ...ORDER_DATA_DEFAULT,
  });

  const updateOrderData = (newData: OrderData) => {
    setOrderData(newData);
  };

  const resetData = useCallback(() => {
    setOrderData({ ...ORDER_DATA_DEFAULT });
  }, [setOrderData]);

  return {
    orderData,
    updateOrderData,
    resetData,
  };
};

export default useOrderData;
