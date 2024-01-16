import React from 'react';
import { Artist } from '../../types';
import { ArtistContainer, Text, ImageContainer, Image, BoldText } from './styles';
import SpotifyLink from '../SpotifyLink';

const ArtistItem: React.FC<{ artist: Artist, index?: number }> = ( { artist, index } ) => {
  const getFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  }

  return (
    <ArtistContainer>
      <BoldText fontSize='1.2em'>{index} {artist.name}</BoldText>
      {artist.followers.total ? 
      <Text>{getFollowers(artist.followers.total)}</Text> :
      <Text>Popularity: {artist.popularity}</Text>}
      <SpotifyLink url={artist.external_urls.spotify} />
      {artist.images[0] && 
      <ImageContainer>
        <Image src={artist.images[0].url} alt={artist.name} />
      </ImageContainer>}
    </ArtistContainer>
  )
}

export default ArtistItem