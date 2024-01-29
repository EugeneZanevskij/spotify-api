import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserProfile } from '../../types';

interface SpotifyState {
  user: UserProfile | null;
}

const initialState: SpotifyState = {
  user: null,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAsync.pending, () => {
        console.log('pending');
      })
      .addCase(getUserProfileAsync.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    });
  }
});

export const getUserProfileAsync = createAsyncThunk(
  'spotify/getUserProfileAsync',
  async (access_token: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const json = await response.json();
    return json as UserProfile;
  }
)

export default spotifySlice.reducer;