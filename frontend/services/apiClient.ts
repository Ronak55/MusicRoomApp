import { API_BASE_URL } from '@env';
import axios from 'axios';

const apiClient = axios.create({
  baseURL:"https://musicroombackend-2.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

export const apiPost = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  const response = await apiClient.post<T>(url, body);
  return response.data;
};
export const apiGetWithToken = async <T>(url: string, token: string): Promise<T> => {
  const response = await apiClient.get<T>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const apiPostWithToken = async <T, B = unknown>(
  url: string,
  body: B,
  token: string
): Promise<T> => {
  const response = await apiClient.post<T>(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default apiClient;
