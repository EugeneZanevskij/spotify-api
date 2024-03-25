import RecentlyPlayedTrackItem from "../../components/RecentlyPlayedTrack";
import styled from "styled-components";
import useRecentlyPlayedFromRedux from "./useRecentlyPlayedFromRedux";
import Error from "../../components/Error";

const RecentlyPlayedPageContainer = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const RecentlyPlayed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const RecentlyPlayedPage: React.FC = () => {
  const { recentlyPlayedTracks, loading, error } = useRecentlyPlayedFromRedux();
  return (
    <RecentlyPlayedPageContainer>
      <Title>Recently Played Tracks</Title>
      {loading && <h2>Loading top tracks...</h2>}
      {error && (
        <>
          <h2>Failed to fetch top tracks</h2>
          <Error error={error} />
        </>
      )}
      {recentlyPlayedTracks && (
        <RecentlyPlayed>
          {recentlyPlayedTracks.map((recentlyPlayedTrack) => (
            <RecentlyPlayedTrackItem
              key={recentlyPlayedTrack.track.id}
              recentlyPlayedTrack={recentlyPlayedTrack}
            />
          ))}
        </RecentlyPlayed>
      )}
    </RecentlyPlayedPageContainer>
  );
};

export default RecentlyPlayedPage;
