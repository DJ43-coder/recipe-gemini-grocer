import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/config/api';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    apiClient.setAccessToken(response.accessToken);
    return response;
  },

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    apiClient.setAccessToken(response.accessToken);
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    apiClient.setAccessToken(null);
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  },

  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ accessToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    apiClient.setAccessToken(response.accessToken);
    return response.accessToken;
  },
};
