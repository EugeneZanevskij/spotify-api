import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAsync.pending, () => {
        console.log('pending');
      })
      .addCase(getTokenAsync.fulfilled, (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    });
  }
});

export const getTokenAsync = createAsyncThunk(
  'auth/getTokenAsync',
  async () => {
    const response = await fetch('http://localhost:7000/token');
    const json = await response.json();
    return json.access_token as string;
  }
)

export default authSlice.reducer;