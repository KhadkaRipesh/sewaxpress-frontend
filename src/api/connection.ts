import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_URL } from '../constants/constants';

// pagination
export interface PaginationType {
  page: number;
  limit: number;
}

export interface BookingQuery {
  book_status?:
    | 'BOOKING_PROCESSING'
    | 'BOOKING_PLACED'
    | 'BOOKING_COMPLETED'
    | 'BOOKING_CANCELLED'
    | 'READYFORSERVICE';
  date?: 'YESTERDAY' | 'TODAY' | 'custom' | 'LAST_7_DAYS' | 'LAST_30_DAYS';
  start_date?: string | null;
  end_date?: string | null;
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
    after_fare_price: number;
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createService(data: any, jwt: string | null) {
  console.log(data);
  const res = await axiosInstance.post('/service', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

// update service on hub
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateService(id: string, data: any, jwt: string | null) {
  const res = await axiosInstance.patch(`/service/${id}`, data, {
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

// get my booked services

export async function getMyBookings(query: BookingQuery, jwt: string | null) {
  const res = await axiosInstance.get('book/my-booking', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: query,
  });
  return res;
}

// change password
export async function changePassword(
  data: {
    current_password: string;
    new_password: string;
    re_password: string;
  },
  jwt: string | null
) {
  const res = await axiosInstance.post('auth/change-password', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// get booking details by customer
export async function getBookDetailByCustomer(
  book_id: string | null,
  jwt: string | null
) {
  const res = await axiosInstance.get(`book/customer/${book_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// cancel booking by customer
export async function cancelBooking(
  // data: { cancelled_reason: string | null },
  book_id: string | null,
  jwt: string | null
) {
  const res = await axiosInstance.post(`book/cancel/${book_id}`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function makePayment(book_id: string | null, jwt: string | null) {
  const res = await axiosInstance.post(`book/payment/${book_id}`, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// application for becomming service provider
export async function applicationForServiceProvider(formData: FormData) {
  const res = await axiosInstance.post('hub', formData);
  return res;
}

// fetch hub from admin
export async function fetchHubs(jwt: string | null) {
  const res = await axiosInstance.get('hub/admin', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// update book status by service provider
export async function updateBookStatus(
  book_id: string,
  data: { book_status: string | null },
  jwt: string | null
) {
  const res = await axiosInstance.post(`book/change-status/${book_id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// update hub status by admin
export async function updateHubStatus(
  hub_id: string,
  data: { status: string | null },
  jwt: string | null
) {
  const res = await axiosInstance.patch(`hub/admin/${hub_id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

// get all booking of hub on specific service provider
export async function fetchBookingOfServiceProvider(
  jwt: string | null,
  query: BookingQuery
) {
  const res = await axiosInstance.get('/book', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: query,
  });

  return res;
}

// add category by admin
export async function createCategory(data: unknown, jwt: string | null) {
  const res = await axiosInstance.post('/category', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

// edit category by admin
export async function editCategory(
  id: string,
  data: unknown,
  jwt: string | null
) {
  console.log(data);
  const res = await axiosInstance.patch(`/category/${id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}
// delete category by admin
export async function deleteCategory(
  category_id: string | null,
  jwt: string | null
) {
  const res = await axiosInstance.delete(`/category/${category_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}
// fetch all categories
export async function fetchCategories(page: number, limit: number) {
  const res = await axiosInstance.get(`/category?page=${page}&limit=${limit}`);
  return res;
}

//  fetch category by id
export async function fetchCategoryById(id: string) {
  const res = await axiosInstance.get(`category/${id}`);
  return res;
}

// update user profile
export async function updateProfile(data: unknown, jwt: string | null) {
  console.log(data);
  const res = await axiosInstance.patch(`users/current-user`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}
