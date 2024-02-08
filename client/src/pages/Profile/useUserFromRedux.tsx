import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAsync } from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";

const useUserFromRedux = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.spotify.user);
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    dispatch(getUserProfileAsync(accessToken));
  }, [accessToken, dispatch]);

  return { user, loading, error };
};

export default useUserFromRedux;
