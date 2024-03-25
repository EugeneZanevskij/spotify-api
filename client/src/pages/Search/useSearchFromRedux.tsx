import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchAlbumsAsync,
  searchArtistsAsync,
  searchTracksAsync,
} from "../../state/spotify/spotifySlice";
import { RootState, AppDispatch } from "../../state/store";
import { SearchType } from "../../types";

type Props = {
  searchType: SearchType;
  query: string;
  isUpdated: boolean;
};
const useSearchFromRedux = ({ searchType, query, isUpdated }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const tracks = useSelector((state: RootState) => state.spotify.tracks);
  const artists = useSelector((state: RootState) => state.spotify.artists);
  const albums = useSelector((state: RootState) => state.spotify.albums);
  const loading = useSelector((state: RootState) => state.spotify.loading);
  const error = useSelector((state: RootState) => state.spotify.error);

  useEffect(() => {
    if (isUpdated) {
      switch (searchType) {
        case "track":
          dispatch(searchTracksAsync({ accessToken, query }));
          break;
        case "album":
          dispatch(searchAlbumsAsync({ accessToken, query }));
          break;
        case "artist":
          dispatch(searchArtistsAsync({ accessToken, query }));
          break;
      }
    }
  }, [isUpdated, searchType, query, accessToken, dispatch]);

  return { tracks, artists, albums, loading, error };
};

export default useSearchFromRedux;
