import axios from 'axios';

export const setupAxios = () => {
  axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
};
