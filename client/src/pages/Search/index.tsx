import React, { useState } from 'react';
import { Artist } from '../../types';
import { SearchPageWrapper, SearchForm, SearchInput, SearchButton, SearchResults, SearchResultItem, Text, BoldText, ImageContainer, Image } from './styles';


function SearchPage( {token} : {token: string} ) {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setArtists(data.artists.items);
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
          <SearchResultItem key={artist.id}>
            <Text>{artist.name}:</Text>
            {artist.images[0] && 
            <ImageContainer>
              <Image src={artist.images[0].url} alt={artist.name} />
            </ImageContainer>}
          </SearchResultItem>
        ))}
      </SearchResults>
    </SearchPageWrapper>
  );
}

export default SearchPage;