import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Album,
  Artist,
  Track,
  RecentlyPlayedTrack,
  UserProfile,
  TError,
  TrackObjectFull,
  ArtistObjectFull,
} from "../../types";

interface SpotifyState {
  user: UserProfile | null;
  topTracks: TrackObjectFull[] | null;
  topArtists: ArtistObjectFull[] | null;
  tracks: Track[] | null;
  artists: Artist[] | null;
  albums: Album[] | null;
  recentlyPlayedTracks: RecentlyPlayedTrack[] | null;
  loading: boolean;
  error: TError | null;
  status: number | null;
}

const initialState: SpotifyState = {
  user: null,
  topTracks: null,
  topArtists: null,
  tracks: null,
  artists: null,
  albums: null,
  recentlyPlayedTracks: null,
  loading: false,
  error: null,
  status: null,
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAsync.pending, (state) => {
        console.log("pending get user profile");
        state.loading = true;
      })
      .addCase(
        getUserProfileAsync.fulfilled,
        (state, action: PayloadAction<UserProfile | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.user = action.payload as UserProfile;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(getTopTracksAsync.pending, (state) => {
        console.log("pending top tracks");
        state.loading = true;
      })
      .addCase(
        getTopTracksAsync.fulfilled,
        (state, action: PayloadAction<TrackObjectFull[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.topTracks = action.payload;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(getTopArtistsAsync.pending, (state) => {
        console.log("pending top artists");
        state.loading = true;
      })
      .addCase(
        getTopArtistsAsync.fulfilled,
        (state, action: PayloadAction<ArtistObjectFull[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.topArtists = action.payload;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(searchTracksAsync.pending, (state) => {
        console.log("pending search tracks");
        state.loading = true;
      })
      .addCase(
        searchTracksAsync.fulfilled,
        (state, action: PayloadAction<Track[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.tracks = action.payload;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(searchArtistsAsync.pending, (state) => {
        console.log("pending search artists");
        state.loading = true;
      })
      .addCase(
        searchArtistsAsync.fulfilled,
        (state, action: PayloadAction<Artist[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.artists = action.payload;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(searchAlbumsAsync.pending, (state) => {
        console.log("pending search albums");
        state.loading = true;
      })
      .addCase(
        searchAlbumsAsync.fulfilled,
        (state, action: PayloadAction<Album[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.albums = action.payload;
            state.error = null;
          }
          state.loading = false;
        },
      )
      .addCase(getRecentlyPlayedAsync.pending, (state) => {
        console.log("pending recently played");
        state.loading = true;
      })
      .addCase(
        getRecentlyPlayedAsync.fulfilled,
        (state, action: PayloadAction<RecentlyPlayedTrack[] | TError>) => {
          if ("message" in action.payload) {
            state.error = action.payload;
          } else {
            state.recentlyPlayedTracks = action.payload;
            state.error = null;
          }
          state.loading = false;
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
    return response.ok ? (json as UserProfile) : (json.error as TError);
  },
);

export const getTopTracksAsync = createAsyncThunk(
  "spotify/getTopTracksAsync",
  async ({ userId, timeRange }: { userId: number; timeRange: string }) => {
    if (!userId) return { status: 400, message: "User ID is required" };
    const response = await fetch(
      `http://localhost:7000/api/top-tracks/${userId}?timeRange=${timeRange}`,
    );
    const json = await response.json();
    return response.ok ? (json as TrackObjectFull[]) : (json as TError);
  },
);

export const getTopArtistsAsync = createAsyncThunk(
  "spotify/getTopArtistsAsync",
  async ({ userId, timeRange }: { userId: number; timeRange: string }) => {
    const response = await fetch(
      `http://localhost:7000/api/top-artists/${userId}?timeRange=${timeRange}`,
    );
    const json = await response.json();
    return response.ok ? (json as ArtistObjectFull[]) : (json as TError);
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
    return response.ok
      ? (json.tracks.items as Track[])
      : (json.error as TError);
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
    return response.ok
      ? (json.artists.items as Artist[])
      : (json.error as TError);
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
    return response.ok
      ? (json.albums.items as Album[])
      : (json.error as TError);
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
    return response.ok
      ? (json.items as RecentlyPlayedTrack[])
      : (json.error as TError);
  },
);

export default spotifySlice.reducer;
