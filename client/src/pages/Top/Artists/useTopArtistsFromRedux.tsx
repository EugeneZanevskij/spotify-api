import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopArtistsAsync } from "../../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../../state/store";
import { TimeRange } from "../../../types";

const useTopArtistsFromRedux = (timeRange: TimeRange) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const topArtists = useSelector(
    (state: RootState) => state.spotify.topArtists,
  );
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    dispatch(getTopArtistsAsync({ accessToken, timeRange }));
  }, [timeRange, accessToken, dispatch]);

  return { topArtists, loading, error };
};

export default useTopArtistsFromRedux;
