import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCreate, UserEdit } from '../models/user';
import { usersApi } from '../api/usersApi';

export const useUser = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => usersApi.getSingle(id),
  });

  return { data, isFetching };
};

export const useUsers = (page: number, query: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['users', page, query],
    queryFn: () => usersApi.getAllPaginated({ page, query }),
  });

  return { data, isFetching };
};

export const useUserCreate = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (values: UserCreate) => usersApi.createSingle(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { mutateAsync };
};
export const useUserEdit = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['editUser'],
    mutationFn: (values: UserEdit) => usersApi.editSingle(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['whoami'] });
    },
  });

  return { mutateAsync };
};
export const useUserDelete = (id: string) => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => usersApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['whoami'] });
    },
  });

  return { mutateAsync };
};
