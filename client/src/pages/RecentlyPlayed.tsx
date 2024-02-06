import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { getRecentlyPlayedAsync } from "../state/spotify/spotifySlice";
import RecentlyPlayedTrackItem from "../components/RecentlyPlayedTrack";
import styled from "styled-components";

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
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const recentlyPlayedTracks = useSelector(
    (state: RootState) => state.spotify.recentlyPlayedTracks,
  );

  useEffect(() => {
    dispatch(getRecentlyPlayedAsync(accessToken));
  }, [accessToken, dispatch]);

  return (
    <RecentlyPlayedPageContainer>
      <Title>Recently Played Tracks</Title>
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
