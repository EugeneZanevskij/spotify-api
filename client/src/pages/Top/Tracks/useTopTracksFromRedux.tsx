import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopTracksAsync } from "../../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../../state/store";

type TimeRange = "short_term" | "medium_term" | "long_term";
const useTopTracksFromRedux = (timeRange: TimeRange) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const topTracks = useSelector((state: RootState) => state.spotify.topTracks);
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = !accessToken;

  useEffect(() => {
    if (accessToken) {
      dispatch(getTopTracksAsync({ accessToken, timeRange }));
    }
  }, [accessToken, dispatch]);

  return { topTracks, loading, error };
};

export default useTopTracksFromRedux;
