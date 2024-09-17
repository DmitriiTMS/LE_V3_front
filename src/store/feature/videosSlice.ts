import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IVideo {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface IVideoSlice {
  isLoading: boolean;
  isError: boolean;
  videos: IVideo[];
}

export const createVideo = createAsyncThunk(
  "videos/createVideo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/api/videos"
        // {
        //   title: data.title,
        //   description: data.description,
        // }
      );

      //   return response.data;
    } catch (error) {
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
  isLoading: false,
  isError: false,
  videos: [],
};

export const VideosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // CREATE
    // builder.addCase(createVideo.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(createVideo.fulfilled, (state, action: any) => {
    //   state.isLoading = false;
    //     // state.videos.push(action.payload.videos);
    // });
    // builder.addCase(createVideo.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // });
    // getALL
    builder.addCase(getAllVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllVideos.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default VideosSlice.reducer;
