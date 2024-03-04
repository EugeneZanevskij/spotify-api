import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopTracksAsync } from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";
import { TimeRange, TrackObjectFull } from "../../types";

const useTopTracksFromRedux = (timeRange: TimeRange) => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch<AppDispatch>();
  const topTracks = useSelector((state: RootState) => state.spotify.topTracks);
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  const postTopTracksToDB = async ({
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

  useEffect(() => {
    dispatch(getTopTracksAsync({ userId, timeRange }));
  }, [timeRange, userId, dispatch]);

  useEffect(() => {
    if (topTracks) {
      postTopTracksToDB({ userId, timeRange, topTracks });
    }
  }, [topTracks]);

  return { topTracks, loading, error };
};

export default useTopTracksFromRedux;
