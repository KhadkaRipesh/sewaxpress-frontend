import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_URL } from '../constants/constants';

// pagination
export interface PaginationType {
  page: number;
  limit: number;
}

// creating axios instance
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

// fetch user information
export async function userProfile(jwt: string) {
  const res = await axiosInstance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function fetchServices(
  city: string | undefined,
  category: string | undefined,
  pagination: PaginationType
) {
  const res = await axiosInstance.get(
    `/service/${city}/${category}?page=${pagination.page}&limit=${pagination.limit}`
  );
  return res;
}

export async function addServiceToCart(
  data: { service_id: string; hub_id: string },
  jwt: null | string
) {
  const res = await axiosInstance.post('/cart', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function getCart(jwt: null | string) {
  const res = await axiosInstance.get('/cart', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function deleteCartService(
  service_id: string,
  jwt: null | string
) {
  const res = await axiosInstance.delete(`/cart/service/${service_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
