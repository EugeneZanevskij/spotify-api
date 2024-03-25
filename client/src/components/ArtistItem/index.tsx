import React from "react";
import { ArtistObjectFull } from "../../types";
import {
  ArtistContainer,
  Text,
  ImageContainer,
  Image,
  BoldText,
} from "./styles";
import SpotifyLink from "../SpotifyLink";
import { topChanges } from "../../constants";

const ArtistItem: React.FC<{ artist: ArtistObjectFull; index?: number }> = ({
  artist,
  index,
}) => {
  const getFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  const getIcon = (change: string) => {
    const topChange =
      topChanges.find((topChange) => change === topChange.value) ||
      topChanges[0];
    return <topChange.icon size={18} color={topChange.color} />;
  };

  return (
    <ArtistContainer>
      <BoldText fontSize="1.2em">
        {index && getIcon(artist.change)} {index} {artist.name}
      </BoldText>
      {artist.followers.total ? (
        <Text>{getFollowers(artist.followers.total)}</Text>
      ) : (
        <Text>Popularity: {artist.popularity}</Text>
      )}
      <SpotifyLink url={artist.external_urls.spotify} />
      {artist.images[0] && (
        <ImageContainer>
          <Image src={artist.images[0].url} alt={artist.name} />
        </ImageContainer>
      )}
    </ArtistContainer>
  );
};

export default ArtistItem;
