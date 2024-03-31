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

// fetch all services
export async function fetchServices(
  city: string | undefined,
  category: string | undefined
) {
  const res = await axiosInstance.get(`/service/${city}/${category}`);
  return res;
}

// add service on cart
export async function addServiceToCart(
  data: { service_id: string; hub_id: string },
  jwt: null | string
) {
  const res = await axiosInstance.post('/cart', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  return res;
}

// get cart
export async function getCart(jwt: null | string) {
  const res = await axiosInstance.get('/cart', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// delete cart
export async function deleteCart(jwt: null | string) {
  const res = await axiosInstance.delete('/cart', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// delete service from cart
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

// book Service
export async function bookService(
  data: {
    booking_date: string;
    booking_address: string;
  },
  jwt: string | null
) {
  const res = await axiosInstance.post(`/book`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });

  return res;
}
// get service from service provider
export async function fetchOwnServices(jwt: string | null) {
  const res = await axiosInstance.get('/service/my-service', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
// delete my service
export async function deleteMyService(
  service_id: string | null,
  jwt: string | null
) {
  const res = await axiosInstance.delete(`/service/${service_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
// add service on hub
export async function createService(
  data: {
    service_id: string;
    hub_id: string;
  },
  jwt: string | null
) {
  console.log(data);
  const res = await axiosInstance.post('/service', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

export async function sessionUser(jwt: null | string) {
  const res = await axiosInstance.get('/users/current-user', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// get room by id
export async function getRoomById(room_id: string | null, jwt: string | null) {
  const res = await axiosInstance.get(`/chat/room/${room_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// to create chat room
export async function createChatRoom(
  data: { hub_id: string; customer_id: string },
  jwt: string | null
) {
  const res = await axiosInstance.post('chat/room/', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// for saving fcm token
export async function saveToken(
  data: {
    notification_token: string;
    device_type: string;
  },
  jwt: string | null
) {
  const res = await axiosInstance.post('firebase/save-token', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// for getting notification
export async function getNotification(jwt: string | null) {
  const res = await axiosInstance.get('notification', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
