import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/ordersApi';
import { OrderCreate, OrderEdit } from '../models/order';

export const useOrder = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['order'],
    queryFn: () => ordersApi.getSingle(id),
  });

  return { data, isFetching };
};

export const useUserOrders = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['userOrders'],
    queryFn: () => ordersApi.getAll(id),
  });

  return { data, isFetching };
};

export const useOrders = (
  page: number,
  query: string,
  winery?: string,
  status?: string,
) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['orders', page, query],
    queryFn: () => ordersApi.getAllPaginated({ page, query, winery, status }),
  });

  return { data, isFetching, refetch };
};

export const useOrderCreate = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (values: OrderCreate) => ordersApi.createSingle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return { mutateAsync };
};
export const useOrderEdit = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['editOrder'],
    mutationFn: (values: OrderEdit) => ordersApi.editSingle(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return { mutateAsync };
};
export const useOrderDelete = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['deleteOrder'],
    mutationFn: () => ordersApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });

  return { mutateAsync };
};
