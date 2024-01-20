import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Track, UserProfile } from '../../types';

interface SpotifyState {
  user: UserProfile | null;
  topTracks: Track[] | null;
}

const initialState: SpotifyState = {
  user: null,
  topTracks: null
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAsync.pending, () => {
        console.log('pending user profile');
      })
      .addCase(getUserProfileAsync.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    })
    .addCase(getTopTracksAsync.pending, () => {
      console.log('pending top tracks');
    })
    .addCase(getTopTracksAsync.fulfilled, (state, action: PayloadAction<Track[]>) => {
      state.topTracks = action.payload;
    })
  }
});

export const getUserProfileAsync = createAsyncThunk(
  'spotify/getUserProfileAsync',
  async (accessToken: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    return json as UserProfile;
  }
);

export const getTopTracksAsync = createAsyncThunk(
  'spotify/getTopTracksAsync',
  async ({ accessToken, timeRange }: { accessToken: string, timeRange: string }) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    return json.items as Track[];
  }
);

export default spotifySlice.reducer;