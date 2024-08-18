import axios, { InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/utils/initFirebase';

const axiosInstance = axios.create();

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = auth.currentUser && await auth.currentUser.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(onRequest);

export default axiosInstance;
