import React, { useState } from 'react';
import { Album, Artist, Track } from '../../types';
import { SearchPageWrapper, ButtonContainer, StyledButton, SearchForm, SearchInput, SearchButton, SearchResults, SearchResultItem, Text, BoldText, ImageContainer, Image, SearchInputs } from './styles';
import ArtistItem from '../../components/ArtistItem';
import AlbumItem from '../../components/AlbumItem';


function SearchPage( {token} : {token: string} ) {
  const [searchType, setSearchType] = useState< "album"|"artist"|"track">('track');
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
        'Authorization': `Bearer ${token}`
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
            <SearchResultItem key={track.id}>
              <Text>{track.name}:</Text>
              <Text>{track.album.name}:</Text>
              <Text fontSize='.8em'>{track.album.artists[0].name}:</Text>
              {track.album.images[0] && 
              <ImageContainer>
                <Image src={track.album.images[0].url} alt={track.album.name} />
              </ImageContainer>}
            </SearchResultItem>
          ))}
        </SearchResults>
      }
    </SearchPageWrapper>
  );
}

export default SearchPage;