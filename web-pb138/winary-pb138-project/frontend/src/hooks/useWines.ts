import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { winesApi } from '../api/winesApi';
import { WineCreate, WineEdit } from '../models/wine';

export const useWine = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['wine'],
    queryFn: () => winesApi.getSingle(id),
  });

  return { data, isFetching };
};

export const useWines = (
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
      'wines',
      page,
      query,
      wineType,
      alcoholMax,
      sugarMax,
      priceMax,
      priceMin,
      year,
      sortPrice,
      sortYear,
    ],
    queryFn: () =>
      winesApi.getAllPaginated({
        page,
        query,
        wineType,
        alcoholMax,
        sugarMax,
        priceMax,
        priceMin,
        year,
        sortPrice,
        sortYear,
      }),
  });

  return { data, isFetching };
};

export const useWineCreate = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['createWine'],
    mutationFn: (values: WineCreate) => winesApi.createSingle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      queryClient.invalidateQueries({ queryKey: ['wine'] });
      queryClient.invalidateQueries({ queryKey: ['wineryWines'] });
    },
  });

  return { mutateAsync };
};
export const useWineEdit = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['editWine'],
    mutationFn: (values: WineEdit) => winesApi.editSingle(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      queryClient.invalidateQueries({ queryKey: ['wine'] });
      queryClient.invalidateQueries({ queryKey: ['wineryWines'] });
    },
  });

  return { mutateAsync };
};
export const useWineDelete = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['deleteWine'],
    mutationFn: () => winesApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wines'] });
      queryClient.invalidateQueries({ queryKey: ['wine'] });
      queryClient.invalidateQueries({ queryKey: ['wineryWines'] });
    },
  });

  return { mutateAsync };
};
