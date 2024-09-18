import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IVideo {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface IVideoSlice {
  isLoadingGetVideos: boolean;
  isErrorGetVideos: boolean;

  isLoadingCreateVideos: boolean;
  isErrorCreateVideos: boolean;

  isErrorMessage: string[];
  videos: IVideo[];


}

interface IDataVideo {
  title: string;
  description: string;
}

export const createVideo = createAsyncThunk(
  "videos/createVideo",
  async (data: IDataVideo, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4200/api/videos", {
        title: data.title,
        description: data.description,
      });

      return response.data;
    } catch (error: any) {
      if (error.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getAllVideos = createAsyncThunk(
  "videos/getAllVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4200/api/videos");
      return response.data.videos;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IVideoSlice = {
  isLoadingGetVideos: false,
  isErrorGetVideos: false,

  isLoadingCreateVideos: false,
  isErrorCreateVideos: false,

  isErrorMessage: [],
  videos: [],

};

export const VideosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // CREATE
    builder.addCase(createVideo.pending, (state) => {
      state.isLoadingCreateVideos = true;
      
    });
    builder.addCase(createVideo.fulfilled, (state, action: any) => {
      state.isLoadingCreateVideos = false;
      state.isErrorCreateVideos = false;
      state.videos.push(action.payload.video);
      
    });
    builder.addCase(createVideo.rejected, (state, action: any) => {
      state.isErrorCreateVideos = true;
      state.isErrorMessage = [];
      if (action.payload.status === 404) {
        state.isErrorMessage = [];
      } else {
        state.isErrorMessage = [...state.isErrorMessage, ...action.payload];
      }
      state.isLoadingCreateVideos = false;

    });
    // getALL
    builder.addCase(getAllVideos.pending, (state) => {
      state.isLoadingGetVideos = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
      state.isLoadingGetVideos = false;
    });
    builder.addCase(getAllVideos.rejected, (state) => {
      state.isErrorGetVideos = true;
    });
  },
});

export default VideosSlice.reducer;
