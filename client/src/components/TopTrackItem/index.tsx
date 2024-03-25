import React from "react";
import { TrackObjectFull } from "../../types";
import {
  TrackItem,
  TrackContainer,
  TrackImage,
  Text,
  BoldText,
} from "./styles";
import SpotifyLink from "../SpotifyLink";
import { topChanges } from "../../constants";

const TopTrackItem: React.FC<{ track: TrackObjectFull; index: number }> = ({
  track,
  index,
}) => {
  const trackDuration = () => {
    const duration = track.duration_ms / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const getIcon = (change: string) => {
    const topChange =
      topChanges.find((topChange) => change === topChange.value) ||
      topChanges[0];
    return <topChange.icon size={30} color={topChange.color} />;
  };

  return (
    <TrackItem key={track.id}>
      <TrackContainer flexDirection="row">
        {getIcon(track.change)}
        <span>{index + 1}</span>
        <TrackImage src={track.album.images[0].url} alt={track.album.name} />
      </TrackContainer>
      <TrackContainer gap="0">
        <BoldText fontSize="1.2em">{track.name}</BoldText>
        <Text>{track.artists.map((artist) => artist.name).join(", ")}</Text>
      </TrackContainer>
      <TrackContainer>
        <SpotifyLink url={track.external_urls.spotify} />
        <Text>{trackDuration()}</Text>
      </TrackContainer>
    </TrackItem>
  );
};

export default TopTrackItem;
