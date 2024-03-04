import { ArtistObjectFull, TimeRange, TrackObjectFull } from "./types";

export async function fetchProfileId(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.id;
}

export async function createPlaylist(
  accessToken: string,
  profileId: string,
  timeRange: string,
  date: string,
) {
  const response = await fetch(
    "https://api.spotify.com/v1/users/" + profileId + "/playlists",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${timeRange} Top Tracks dated ${date}`,
      }),
    },
  );
  const data = await response.json();
  return { playlistId: data.id, playlistUrl: data.external_urls.spotify };
}

export async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  tracks: TrackObjectFull[],
) {
  await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: tracks.map((track) => track.uri),
    }),
  });
}

export const postTopTracksToDB = async ({
  userId,
  timeRange,
  topTracks,
}: {
  userId: number;
  timeRange: TimeRange;
  topTracks: TrackObjectFull[];
}) => {
  try {
    const topTracksData = topTracks.map((topTrack) => topTrack.id);
    await fetch(`http://localhost:7000/api/top-tracks/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, timeRange, tracks: topTracksData }),
    });
  } catch (error) {
    console.error("Error posting top tracks to the database:", error);
  }
};

export async function logoutFromApp() {
  const response = await fetch("http://localhost:7000/api/auth/logout");
  const data = await response.json();
  return { result: data.result, message: data.message };
}

export const postTopArtistsToDB = async ({
  userId,
  timeRange,
  topArtists,
}: {
  userId: number;
  timeRange: TimeRange;
  topArtists: ArtistObjectFull[];
}) => {
  try {
    const topTracksData = topArtists.map((topArtist) => topArtist.id);
    await fetch(`http://localhost:7000/api/top-artists/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, timeRange, artists: topTracksData }),
    });
  } catch (error) {
    console.error("Error posting top tracks to the database:", error);
  }
};
