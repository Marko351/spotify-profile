import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const login = () => {
  return axios.get('/login');
};

export const useLogin = () => useMutation(login);
