import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopArtistsAsync } from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";
import { TimeRange } from "../../types";
import { postTopArtistsToDB } from "../../api";

const useTopArtistsFromRedux = (timeRange: TimeRange) => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch<AppDispatch>();
  const topArtists = useSelector(
    (state: RootState) => state.spotify.topArtists,
  );
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    if (userId) {
      dispatch(getTopArtistsAsync({ userId, timeRange }));
    }
  }, [timeRange, userId, dispatch]);

  useEffect(() => {
    if (topArtists) {
      postTopArtistsToDB({ userId, timeRange, topArtists });
    }
  }, [topArtists]);

  return { topArtists, loading, error };
};

export default useTopArtistsFromRedux;
