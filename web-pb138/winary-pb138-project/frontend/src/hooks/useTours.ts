import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toursApi } from '../api/toursApi';
import { TourAddWinery, TourCreate, TourEdit } from '../models/tours';

export const useTour = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['tour'],
    queryFn: () => toursApi.getSingle(id),
  });

  return { data, isFetching };
};

export const useTours = (
  page: number,
  query: string,
  happensAfter?: string,
  happensBefore?: string,
  location?: string,
  status?: string,
  orderDate?: string,
) => {
  const { data, isFetching } = useQuery({
    queryKey: [
      'tours',
      page,
      query,
      happensAfter,
      happensBefore,
      location,
      status,
      orderDate,
    ],
    queryFn: () =>
      toursApi.getAllPaginated({
        page,
        query,
        happensAfter,
        happensBefore,
        location,
        status,
        orderDate,
      }),
  });

  return { data, isFetching };
};

export const useTourCreate = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['createTour'],
    mutationFn: (values: TourCreate) => toursApi.createSingle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });

  return { mutateAsync };
};

export const useTourEdit = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['editTour'],
    mutationFn: (values: TourEdit) => toursApi.editSingle(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });

  return { mutateAsync };
};

export const useAddWineryToTour = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['addWineryToTour'],
    mutationFn: (values: TourAddWinery) => toursApi.addWineryToTour(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });

  return { mutateAsync };
};

export const useRemoveWineryFromTour = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['removeWineryFromTour'],
    mutationFn: (values: TourAddWinery) =>
      toursApi.removeWineryFromTour(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });

  return { mutateAsync };
};

export const useTourDelete = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['deleteTour'],
    mutationFn: () => toursApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });

  return { mutateAsync };
};
