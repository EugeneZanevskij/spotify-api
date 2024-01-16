import React, { useState } from 'react';
import { Album, Artist, Track } from '../../types';
import { SearchPageWrapper, SearchForm, SearchInput, SearchButton, SearchResults, SearchResultItem, Text, BoldText, ImageContainer, Image } from './styles';
import ArtistItem from '../../components/ArtistItem';


function SearchPage( {token} : {token: string} ) {
  const [searchType, setSearchType] = useState< "album"|"artist"|"track">('artist');
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=${searchType}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
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

  return (
    <SearchPageWrapper>
      <BoldText fontSize='1.5em'>Spotify Search</BoldText>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search for an artist, album, or track"
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
      <SearchResults>
        {artists.map((artist: Artist) => (
          <ArtistItem key={artist.id} artist={artist} />
        ))}
      </SearchResults>
      <SearchResults>
        {albums.map((album: Album) => (
          <SearchResultItem key={album.id}>
            <Text>{album.name}:</Text>
            <Text fontSize='.8em'>{album.artists[0].name}:</Text>
            {album.images[0] && 
            <ImageContainer>
              <Image src={album.images[0].url} alt={album.name} />
            </ImageContainer>}
          </SearchResultItem>
        ))}
      </SearchResults>
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
    </SearchPageWrapper>
  );
}

export default SearchPage;