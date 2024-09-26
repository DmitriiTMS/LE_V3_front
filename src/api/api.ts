import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";

const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};

const getNewTokens = async () => {
  const refreshToken = Cookies.get("refreshToken");
  const response = await axiosInstance.post<IResponseUser>(
    "auth/login/access-token",
    { refreshToken }
  );
  if (response.data.accessToken) {
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

const BASE_URL = "http://localhost:4200/api/";

const options: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken") || null;
  if (config && config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error: any) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await getNewTokens();
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      }
    }

    throw error;
  }
);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

interface IVideo {
  id?: string;
  title: string;
  description: string;
  url: string;
}

export const getAllVideos = async () => {
  const response = await axiosWithAuth.get<{ videos: IVideo[] }>("videos");
  return response.data.videos;
};

export const createVideo = async (data: any) => {
  const response = await axiosWithAuth.post("videos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateVideo = async (id: string, data: any) => {
  const response = await axiosWithAuth.patch(`videos/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteVideo = async (id: string) => {
  const response = await axiosWithAuth.delete(`videos/${id}`);
  return response.data;
};

// Users

interface IUser {
  id?: string;
  createdAt?: string;
  name: string;
  email: string;
  instagramName?: string;
  isHasPremium?: boolean;
  role?: string;
}

interface IResponseUser {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export const registerUser = async (data: any) => {
  const response = await axiosInstance.post<IResponseUser>(
    "auth/register",
    data
  );

  if (response.data.accessToken) {
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axiosInstance.post<IResponseUser>("auth/login", data);

  if (response.data.accessToken) {
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosWithAuth.get<{ users: IUser[] }>("users");
  return response.data.users;
};

export const getProfileUser = async () => {
  const response = await axiosWithAuth.get<{ user: IUser }>("users/profile");
  return response.data.user;
};

export const getProfileMiddlewareUser = async (refreshToken: string) => {
  const response = await axiosWithAuth.get<{ user: IUser }>("users/profile", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return response.data.user;
};

export const getByIdUser = async (id: string) => {
  const response = await axiosWithAuth.get<IUser>(`users${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await axiosWithAuth.patch<IUser>(`users${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosWithAuth.delete<IUser>(`users${id}`);
  return response.data;
};

// 3:29:23
