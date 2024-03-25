import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import spotifyReducer from "./spotify/spotifySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
