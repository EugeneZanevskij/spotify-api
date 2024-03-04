import React from "react";
import styled from "styled-components";
import { ItemWrapper } from "../helpers/ItemWrapper";
import { PageText } from "../helpers/PageText";
import { RecentlyPlayedTrack } from "../types";
import SpotifyLink from "./SpotifyLink";
import { colors } from "../constants";

const TrackItem = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr 3rem 4.9rem;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  gap: 0.5rem;
`;

const TrackContainer = styled(ItemWrapper)`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  justify-content: space-between;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => (props.gap ? props.gap : "0.5rem")};
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Text = styled(PageText)`
  color: ${(props) => (props.color ? props.color : colors.textColor)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

const BoldText = styled(Text)`
  font-weight: bold;
  padding: 0.4em;
`;

const RecentlyPlayedTrackItem: React.FC<{
  recentlyPlayedTrack: RecentlyPlayedTrack;
}> = ({ recentlyPlayedTrack }) => {
  const trackDuration = () => {
    const duration = recentlyPlayedTrack.track.duration_ms / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const timeStamp = () => {
    const date = new Date(recentlyPlayedTrack.played_at);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} on ${day} ${month} ${year}`;
  };
  return (
    <TrackItem>
      <TrackImage
        src={recentlyPlayedTrack.track.album.images[0].url}
        alt={recentlyPlayedTrack.track.album.name}
      />
      <TrackContainer gap="0">
        <BoldText fontSize="1.2em">{recentlyPlayedTrack.track.name}</BoldText>
        <Text>
          {recentlyPlayedTrack.track.artists
            .map((artist) => artist.name)
            .join(", ")}
        </Text>
      </TrackContainer>
      <TrackContainer>
        <SpotifyLink url={recentlyPlayedTrack.track.external_urls.spotify} />
        <Text>{trackDuration()}</Text>
      </TrackContainer>
      <Text>{timeStamp()}</Text>
    </TrackItem>
  );
};

export default RecentlyPlayedTrackItem;
