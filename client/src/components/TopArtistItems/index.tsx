import styled from "styled-components";
import { TimeRange } from "../../types";
import Error from "../Error";
import useTopArtistsFromRedux from "./useTopArtistsFromRedux";
import ArtistItem from "../ArtistItem";

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const TopArtistItems = ({ timeRange }: { timeRange: TimeRange }) => {
  const { topArtists, loading, error } = useTopArtistsFromRedux(timeRange);
  return (
    <>
      {loading && <h2>Loading top artists...</h2>}
      {error && (
        <>
          <h2>Error: Failed to fetch top artists</h2>
          <Error error={error} />
        </>
      )}
      <ArtistsContainer>
        {topArtists?.map((topArtist, index) => (
          <ArtistItem key={topArtist.id} artist={topArtist} index={index + 1} />
        ))}
      </ArtistsContainer>
    </>
  );
};

export default TopArtistItems;
