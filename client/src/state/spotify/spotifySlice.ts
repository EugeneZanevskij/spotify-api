import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Album,
  Artist,
  Track,
  RecentlyPlayedTrack,
  UserProfile,
} from "../../types";

interface SpotifyState {
  user: UserProfile | null;
  topTracks: Track[] | null;
  topArtists: Artist[] | null;
  tracks: Track[] | null;
  artists: Artist[] | null;
  albums: Album[] | null;
  recentlyPlayedTracks: RecentlyPlayedTrack[] | null;
}

const initialState: SpotifyState = {
  user: null,
  topTracks: null,
  topArtists: null,
  tracks: null,
  artists: null,
  albums: null,
  recentlyPlayedTracks: null,
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAsync.pending, () => {
        console.log("pending get user profile");
      })
      .addCase(
        getUserProfileAsync.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.user = action.payload;
        },
      )
      .addCase(getTopTracksAsync.pending, () => {
        console.log("pending top tracks");
      })
      .addCase(
        getTopTracksAsync.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.topTracks = action.payload;
        },
      )
      .addCase(getTopArtistsAsync.pending, () => {
        console.log("pending top artists");
      })
      .addCase(
        getTopArtistsAsync.fulfilled,
        (state, action: PayloadAction<Artist[]>) => {
          state.topArtists = action.payload;
        },
      )
      .addCase(searchTracksAsync.pending, () => {
        console.log("pending search tracks");
      })
      .addCase(
        searchTracksAsync.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.tracks = action.payload;
        },
      )
      .addCase(searchArtistsAsync.pending, () => {
        console.log("pending search artists");
      })
      .addCase(
        searchArtistsAsync.fulfilled,
        (state, action: PayloadAction<Artist[]>) => {
          state.artists = action.payload;
        },
      )
      .addCase(searchAlbumsAsync.pending, () => {
        console.log("pending search albums");
      })
      .addCase(
        searchAlbumsAsync.fulfilled,
        (state, action: PayloadAction<Album[]>) => {
          state.albums = action.payload;
        },
      )
      .addCase(getRecentlyPlayedAsync.pending, () => {
        console.log("pending recently played");
      })
      .addCase(
        getRecentlyPlayedAsync.fulfilled,
        (state, action: PayloadAction<RecentlyPlayedTrack[]>) => {
          state.recentlyPlayedTracks = action.payload;
        },
      );
  },
});

export const getUserProfileAsync = createAsyncThunk(
  "spotify/getUserProfileAsync",
  async (accessToken: string) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await response.json();
    return json as UserProfile;
  },
);

export const getTopTracksAsync = createAsyncThunk(
  "spotify/getTopTracksAsync",
  async ({
    accessToken,
    timeRange,
  }: {
    accessToken: string;
    timeRange: string;
  }) => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=30`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    return json.items as Track[];
  },
);

export const getTopArtistsAsync = createAsyncThunk(
  "spotify/getTopArtistsAsync",
  async ({
    accessToken,
    timeRange,
  }: {
    accessToken: string;
    timeRange: string;
  }) => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=30`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    return json.items as Artist[];
  },
);

export const searchTracksAsync = createAsyncThunk(
  "spotify/searchTracksAsync",
  async ({ accessToken, query }: { accessToken: string; query: string }) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    return json.tracks.items as Track[];
  },
);

export const searchArtistsAsync = createAsyncThunk(
  "spotify/searchArtistsAsync",
  async ({ accessToken, query }: { accessToken: string; query: string }) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    return json.artists.items as Artist[];
  },
);

export const searchAlbumsAsync = createAsyncThunk(
  "spotify/searchAlbumsAsync",
  async ({ accessToken, query }: { accessToken: string; query: string }) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const json = await response.json();
    return json.albums.items as Album[];
  },
);

export const getRecentlyPlayedAsync = createAsyncThunk(
  "spotify/getRecentlyPlayedAsync",
  async (access_token: string) => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    const json = await response.json();
    return json.items as RecentlyPlayedTrack[];
  },
);

export default spotifySlice.reducer;
