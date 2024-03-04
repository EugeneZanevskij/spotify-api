import React, { useState } from "react";

import { Album, Artist, SearchType, Track } from "../../types";
import ArtistItem from "../../components/ArtistItem";
import AlbumItem from "../../components/AlbumItem";
import TrackItem from "../../components/TrackItem";
import Error from "../../components/Error";
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
import useSearchFromRedux from "./useSearchFromRedux";
import { colors } from "../../constants";

function SearchPage() {
  const [searchType, setSearchType] = useState<SearchType>("track");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const { tracks, artists, albums, loading, error } = useSearchFromRedux({
    searchType,
    query: searchTerm,
    isUpdated,
  });
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsUpdated(false);
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setIsUpdated(false);
    setSearchType(type);
  };

  const handleSearchUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdated(true);
  };

  return (
    <SearchPageWrapper>
      <BoldText fontSize="1.25em">
        Spotify Search for
        <BoldText color={colors.topLinkColor} fontSize="1.5em">
          {searchType}
        </BoldText>
      </BoldText>
      <SearchForm onSubmit={handleSearchUpdate}>
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
      {loading && <BoldText>Loading...</BoldText>}
      {error && <Error error={error} />}
      {!error && !loading && (
        <>
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
        </>
      )}
    </SearchPageWrapper>
  );
}

export default SearchPage;
