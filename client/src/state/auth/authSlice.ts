import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string;
  id: number;
}

const initialState: AuthState = {
  accessToken: "",
  id: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAsync.pending, () => {
        console.log("pending");
      })
      .addCase(
        getTokenAsync.fulfilled,
        (state, action: PayloadAction<{ accessToken: string; id: number }>) => {
          state.accessToken = action.payload.accessToken;
          state.id = action.payload.id;
        },
      );
  },
});

export const getTokenAsync = createAsyncThunk(
  "auth/getTokenAsync",
  async () => {
    const response = await fetch("http://localhost:7000/api/auth/token");
    const json = await response.json();
    return {
      accessToken: json.data.access_token,
      id: json.data.id,
    };
  },
);

export default authSlice.reducer;
