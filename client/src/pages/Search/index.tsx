import React, { useState } from 'react';

import { Album, Artist, Track } from '../../types';
import ArtistItem from '../../components/ArtistItem';
import AlbumItem from '../../components/AlbumItem';
import TrackItem from '../../components/TrackItem';
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
} from './styles';

import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function SearchPage() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // TODO: I would create a type or enum
  const [searchType, setSearchType] = useState<"album" | "artist" | "track">('track');
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const setArraysEmpty = () => {
    setArtists([]);
    setAlbums([]);
    setTracks([]);
  }

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=${searchType}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    setArraysEmpty();
    switch (searchType) {
      case 'album':
        setAlbums(data.albums.items);
        break;
      case 'artist':
        setArtists(data.artists.items);
        break;
      case 'track':
        setTracks(data.tracks.items);
        break;
    }
  };

  const handleSearchTypeChange = (type: "album" | "artist" | "track") => {
    setSearchType(type);
  };

  return (
    <SearchPageWrapper>
      <BoldText fontSize='1.25em'>Spotify Search for<BoldText color='#1DB954' fontSize='1.5em'>{searchType}</BoldText></BoldText>
      <SearchForm onSubmit={handleSearchSubmit}>
        <ButtonContainer>
          <StyledButton onClick={() => handleSearchTypeChange('album')}>Albums</StyledButton>
          <StyledButton onClick={() => handleSearchTypeChange('artist')}>Artists</StyledButton>
          <StyledButton onClick={() => handleSearchTypeChange('track')}>Tracks</StyledButton>
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
      {artists &&
        <SearchResults>
        {artists.map((artist: Artist) => (
          <ArtistItem key={artist.id} artist={artist} />
        ))}
      </SearchResults>
      }
      {albums &&
        <SearchResults>
          {albums.map((album: Album) => (
            <AlbumItem key={album.id} album={album} />
          ))}
        </SearchResults>
      }
      {tracks &&
        <SearchResults>
          {tracks.map((track: Track) => (
            <TrackItem key={track.id} track={track} />
          ))}
        </SearchResults>
      }
    </SearchPageWrapper>
  );
}

export default SearchPage;
