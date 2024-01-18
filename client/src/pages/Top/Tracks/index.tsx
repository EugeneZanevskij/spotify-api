import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Track } from '../../../types';
import { TopTracksContainer, TopTracksTitle, ButtonsContainer, TimeRangeButton, TopTrackItems } from './styles';
import TopTrackItem from '../../../components/TopTrackItem';
import PlaylistButton from '../../../components/PlaylistButton';

const TopTracksPage = ({ token }: { token: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState<string>(searchParams.get('time_range') || 'short_term');

  useEffect(() => {
    async function fetchWebApi(endpoint: string, method: string, body?: object) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getTopTracks() {
      const response = await fetchWebApi(`v1/me/top/tracks?time_range=${timeRange}&limit=30`, 'GET');
      const items = response.items;
      setTracks(items);
    }

    getTopTracks();
  }, [timeRange, token]);

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
    setSearchParams({ time_range: timeRange });
  };

  const buttonsData = [
    { label: '4 weeks', value: 'short_term' },
    { label: '6 months', value: 'medium_term' },
    { label: 'All time', value: 'long_term' },
  ]

  return (
    <TopTracksContainer>
      <TopTracksTitle>Top Tracks</TopTracksTitle>
      <ButtonsContainer>
        {buttonsData.map((button) => (
          <TimeRangeButton
            key={button.value}
            active={timeRange === button.value}
            onClick={() => handleTimeRangeChange(button.value)}
          >
            {button.label}
          </TimeRangeButton>
        ))}
      </ButtonsContainer>
      <TopTrackItems>
        {tracks.map((track, index) => (
          <TopTrackItem key={track.id} track={track} index={index} />
        ))}
      </TopTrackItems>
      <PlaylistButton tracks={tracks} token={token} timeRange={timeRange}/>
    </TopTracksContainer>
  );
};

export default TopTracksPage;