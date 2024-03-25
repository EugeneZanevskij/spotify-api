import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyPlayedAsync } from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";

const useRecentlyPlayedFromRedux = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const recentlyPlayedTracks = useSelector(
    (state: RootState) => state.spotify.recentlyPlayedTracks,
  );
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    dispatch(getRecentlyPlayedAsync(accessToken));
  }, [accessToken, dispatch]);

  return { recentlyPlayedTracks, loading, error };
};

export default useRecentlyPlayedFromRedux;
