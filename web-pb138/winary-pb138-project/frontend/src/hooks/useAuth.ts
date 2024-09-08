import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { loginUser, registerUser } from '../models/user';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['logout'],
    queryFn: () => {
      const result = authApi.getLogoutCode();
      queryClient.invalidateQueries({ queryKey: ['whoami'] });
      return result;
    },
    enabled: false,
  });

  return { data, isFetching, refetch };
};

export const useWhoAmI = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['whoami'],
    queryFn: () => authApi.getWhoAmI(),
    staleTime: 120000,
  });

  return { data, isFetching };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['login'],
    mutationFn: (values: loginUser) => authApi.createSingle('login', values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['whoami'] }),
  });

  return { mutateAsync };
};
export const useRegister = () => {
  const queryClient = useQueryClient();
  const mutateAsync = useMutation({
    mutationKey: ['register'],
    mutationFn: (values: registerUser) =>
      authApi.createSingle('register', values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['whoami'] }),
  });

  return { mutateAsync };
};
