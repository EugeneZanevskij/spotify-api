import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopTracksAsync } from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";
import { TimeRange } from "../../types";
import { postTopTracksToDB } from "../../api";

const useTopTracksFromRedux = (timeRange: TimeRange) => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch<AppDispatch>();
  const topTracks = useSelector((state: RootState) => state.spotify.topTracks);
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    if (userId) {
      dispatch(getTopTracksAsync({ userId, timeRange }));
    }
  }, [timeRange, userId, dispatch]);

  useEffect(() => {
    if (topTracks) {
      postTopTracksToDB({ userId, timeRange, topTracks });
    }
  }, [topTracks]);

  return { topTracks, loading, error };
};

export default useTopTracksFromRedux;
