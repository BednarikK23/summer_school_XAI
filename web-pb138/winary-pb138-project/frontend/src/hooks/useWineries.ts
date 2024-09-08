import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WineryCreate, WineryEdit } from '../models/winery';
import { wineriesApi } from '../api/wineriesApi';

export const useWinery = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['winery', id],
    queryFn: () => wineriesApi.getSingle(id),
  });

  return { data, isFetching };
};

export const useWineries = (
  page: number,
  query: string,
  location?: string,
  openingTime?: string,
  closingTime?: string,
  wineType?: string,
  orderOpen?: string,
  orderClose?: string,
) => {
  const { data, isFetching } = useQuery({
    queryKey: [
      'wineries',
      page,
      query,
      location,
      openingTime,
      closingTime,
      wineType,
      orderOpen,
      orderClose,
    ],
    queryFn: () =>
      wineriesApi.getAllPaginated({
        page,
        query,
        location: location,
        openingTime: openingTime,
        closingTime: closingTime,
        wineType: wineType,
        orderOpen: orderOpen,
        orderClose: orderClose,
      }),
  });

  return { data, isFetching };
};

export const useWineryCreate = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['createWinery'],
    mutationFn: (values: WineryCreate) => wineriesApi.createSingle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wineries'] });
      queryClient.invalidateQueries({ queryKey: ['winery'] });
      queryClient.invalidateQueries({ queryKey: ['whoami'] });
    },
  });

  return { mutateAsync };
};
export const useWineryEdit = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['editWinery'],
    mutationFn: (values: WineryEdit) => wineriesApi.editSingle(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wineries'] });
      queryClient.invalidateQueries({ queryKey: ['winery'] });
    },
  });

  return { mutateAsync };
};
export const useWineryDelete = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['deleteWinery'],
    mutationFn: () => wineriesApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wineries'] });
      queryClient.invalidateQueries({ queryKey: ['winery'] });
    },
  });

  return { mutateAsync };
};

export const useWineryWines = (
  id: string,
  page: number,
  query: string,
  wineType?: string,
  alcoholMax?: string,
  sugarMax?: string,
  priceMax?: string,
  priceMin?: string,
  year?: string,
  sortPrice?: string,
  sortYear?: string,
) => {
  const { data, isFetching } = useQuery({
    queryKey: [
      'wineryWines',
      page,
      query,
      alcoholMax,
      sugarMax,
      priceMax,
      priceMin,
      wineType,
      year,
      sortPrice,
      sortYear,
    ],
    queryFn: () =>
      wineriesApi.getAllWineryWinesPaginated(id, {
        page,
        query,
        alcoholMax,
        sugarMax,
        priceMax,
        priceMin,
        wineType,
        year,
        sortPrice,
        sortYear,
      }),
  });
  return { data, isFetching };
};

export const useWineryTours = (
  id: string,
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
      'wineryTours',
      page,
      query,
      happensAfter,
      happensBefore,
      location,
      status,
      orderDate,
    ],
    queryFn: () =>
      wineriesApi.getAllWineryToursPaginated(id, {
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
