import axios from "axios";

const BASE_URL = "http://localhost:4200/api/";

interface IVideo {
  id?: string;
  title: string;
  description: string;
  url: string;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getAllVideos = async () => {
  const response = await axiosInstance.get<{ videos: IVideo[] }>("videos");
  return response.data.videos;
};

export const createVideo = async (data: any) => {
  const response = await axiosInstance.post("videos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateVideo = async (id: string, data: any) => {
  const response = await axiosInstance.patch(`videos/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteVideo = async (id: string) => {
  const response = await axiosInstance.delete(`videos/${id}`);
  return response.data;
};
