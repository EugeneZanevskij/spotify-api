import styled from "styled-components";
import TopTrackItem from "../TopTrackItem";
import PlaylistButton from "../PlaylistButton";
import { TimeRange } from "../../types";
import useTopTracksFromRedux from "./useTopTracksFromRedux";

const TopTrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
`;

type Props = {
  timeRange: TimeRange;
  getButtonText: () => string;
};

const TopTrackItems = ({ timeRange, getButtonText }: Props) => {
  const { topTracks, loading, error } = useTopTracksFromRedux(timeRange);
  return (
    <TopTrackContainer>
      {error && <h2>Error: Failed to fetch top tracks</h2>}
      {loading && <h2>Loading top tracks...</h2>}
      {topTracks?.map((topTrack, index) => (
        <TopTrackItem key={topTrack.id} track={topTrack} index={index} />
      ))}
      {topTracks && (
        <PlaylistButton tracks={topTracks} timeRange={getButtonText()} />
      )}
    </TopTrackContainer>
  );
};

export default TopTrackItems;
