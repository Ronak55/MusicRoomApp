// services/authService.ts
import { apiGetWithToken, apiPost, apiPostWithToken } from './apiClient';
import { AuthResponse, BookCoursePayload, Course } from './types';

// Public
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return apiPost<AuthResponse, { email: string; password: string }>('/auth/signin', { email, password });
}

export async function signUp(name:string, email: string, password: string): Promise<AuthResponse> {
  return apiPost<AuthResponse, { name:string, email: string; password: string }>('/auth/signup', { name, email, password });
}

// 🔐 Authenticated GET
export const getCourses = async (token: string): Promise<Course[]> => {
  return apiGetWithToken<Course[]>('/courses', token);
};

export const getCourseById = async (id: string, token: string): Promise<Course> => {
  return apiGetWithToken<Course>(`/courses/${id}`, token);
};

// 🔐 Authenticated POST
export const bookCourse = async (payload: BookCoursePayload, token: string) => {
  return apiPostWithToken('/bookings', payload, token);
};
