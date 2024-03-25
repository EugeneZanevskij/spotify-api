import React from "react";
import { PageText } from "../helpers/PageText";
import styled from "styled-components";
import { Track } from "../types";
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

const TrackItem: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <SearchResultItem>
      <BoldText fontSize="1.2em">{track.name}</BoldText>
      <Text fontSize="0.8em">Album: {track.album.name} </Text>
      <Text fontSize="1em">
        {track.artists.map((artist) => artist.name).join(", ")}
      </Text>
      {/* <Text>{releaseDate()}</Text> */}
      <SpotifyLink url={track.external_urls.spotify} />
      <ImageContainer>
        <Image src={track.album.images[0].url} alt={track.album.name} />
      </ImageContainer>
    </SearchResultItem>
  );
};

export default TrackItem;
