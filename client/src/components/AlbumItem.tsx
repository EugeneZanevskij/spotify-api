import React from "react";
import { PageText } from "../helpers/PageText";
import styled from "styled-components";
import { Album } from "../types";
import SpotifyLink from "./SpotifyLink";
import { colors } from "../constants";

const SearchResultItem = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.borderColor};
  border-radius: 0.25rem;
  width: min-content;
  text-align: center;
  gap: 0.25rem;
`;

const Text = styled(PageText)`
  color: ${(props) => (props.color ? props.color : colors.textColor)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

const BoldText = styled(Text)`
  font-weight: bold;
  padding: 0.4em;
`;

const ImageContainer = styled.div`
  height: 13em;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const Image = styled.img`
  width: 13em;
`;

const AlbumItem: React.FC<{ album: Album }> = ({ album }) => {
  const releaseDate = () => {
    const date = new Date(album.release_date);
    const month = date.toLocaleString("en", { month: "short" });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  };

  return (
    <SearchResultItem key={album.id}>
      <BoldText fontSize="1.2em">{album.name}</BoldText>
      <Text fontSize="0.7em">
        {album.total_tracks} track{album.total_tracks > 1 && "s"}
      </Text>
      <Text fontSize="1em">{album.artists[0].name}</Text>
      <Text>{releaseDate()}</Text>
      <SpotifyLink url={album.external_urls.spotify} />
      <ImageContainer>
        <Image src={album.images[0].url} alt={album.name} />
      </ImageContainer>
    </SearchResultItem>
  );
};

export default AlbumItem;
