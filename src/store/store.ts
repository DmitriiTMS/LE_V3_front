import { configureStore } from "@reduxjs/toolkit";
import { VideosSlice } from "./feature/videosSlice";

export const store = configureStore({
  reducer: {
    videos: VideosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
