import React, { useState } from "react";

import { Album, Artist, Track } from "../../types";
import ArtistItem from "../../components/ArtistItem";
import AlbumItem from "../../components/AlbumItem";
import TrackItem from "../../components/TrackItem";
import {
  SearchPageWrapper,
  ButtonContainer,
  StyledButton,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchResults,
  BoldText,
  SearchInputs,
} from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import {
  searchAlbumsAsync,
  searchArtistsAsync,
  searchTracksAsync,
} from "../../state/spotify/spotifySlice";

type SearchType = "album" | "artist" | "track";

function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  //TODO: do selectors in state
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const tracks = useSelector((state: RootState) => state.spotify.tracks);
  const artists = useSelector((state: RootState) => state.spotify.artists);
  const albums = useSelector((state: RootState) => state.spotify.albums);
  const [searchType, setSearchType] = useState<SearchType>("track");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    switch (searchType) {
      case "album":
        dispatch(searchAlbumsAsync({ accessToken, query: searchTerm }));
        break;
      case "artist":
        dispatch(searchArtistsAsync({ accessToken, query: searchTerm }));
        break;
      case "track":
        dispatch(searchTracksAsync({ accessToken, query: searchTerm }));
        break;
    }
  };

  const handleSearchTypeChange = (type: "album" | "artist" | "track") => {
    setSearchType(type);
  };

  return (
    <SearchPageWrapper>
      <BoldText fontSize="1.25em">
        Spotify Search for
        <BoldText color="#1DB954" fontSize="1.5em">
          {searchType}
        </BoldText>
      </BoldText>
      <SearchForm onSubmit={handleSearchSubmit}>
        <ButtonContainer>
          <StyledButton onClick={() => handleSearchTypeChange("album")}>
            Albums
          </StyledButton>
          <StyledButton onClick={() => handleSearchTypeChange("artist")}>
            Artists
          </StyledButton>
          <StyledButton onClick={() => handleSearchTypeChange("track")}>
            Tracks
          </StyledButton>
        </ButtonContainer>
        <SearchInputs>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search for an artist, album, or track"
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchInputs>
      </SearchForm>
      {searchType === "artist" && (
        <SearchResults>
          {artists?.map((artist: Artist) => (
            <ArtistItem key={artist.id} artist={artist} />
          ))}
        </SearchResults>
      )}
      {searchType === "album" && (
        <SearchResults>
          {albums?.map((album: Album) => (
            <AlbumItem key={album.id} album={album} />
          ))}
        </SearchResults>
      )}
      {searchType === "track" && (
        <SearchResults>
          {tracks?.map((track: Track) => (
            <TrackItem key={track.id} track={track} />
          ))}
        </SearchResults>
      )}
    </SearchPageWrapper>
  );
}

export default SearchPage;
