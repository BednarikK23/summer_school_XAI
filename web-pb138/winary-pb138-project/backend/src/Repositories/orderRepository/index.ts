import {
  createOrder,
  deleteOrder,
  getAllOrdersPaginated,
  getOrderById,
  updateOrderStatus,
} from './orderRepository';

const orderRepository = {
  getOrderById,
  getAllOrdersPaginated,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};

export default orderRepository;
