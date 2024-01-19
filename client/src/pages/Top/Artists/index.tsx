import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Artist } from '../../../types';
import { TopContainer, TopTitle, ButtonsContainer, TimeRangeButton, ArtistsContainer } from './styles';
import ArtistItem from '../../../components/ArtistItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const TopArtistsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>(searchParams.get('time_range') || 'short_term');
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    async function fetchWebApi(endpoint: string, method: string, body?: object) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getTopTracks() {
      const response = await fetchWebApi(`v1/me/top/artists?time_range=${timeRange}&limit=20`, 'GET');
      const items = response.items;
      setArtists(items);
    }

    getTopTracks();
  }, [timeRange, accessToken]);

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
    setSearchParams({ time_range: newTimeRange });
  };

  const buttonsData = [
    { label: '4 weeks', value: 'short_term' },
    { label: '6 months', value: 'medium_term' },
    { label: 'All time', value: 'long_term' },
  ];

  const getButtonText = () => {
    return buttonsData.find((button) => button.value === timeRange)?.label || '4 weeks';
  };

  return (
    <TopContainer>
      <TopTitle>Top Artists of {getButtonText()}</TopTitle>
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
      <ArtistsContainer>
        {artists?.map((artist, index) => (
          <ArtistItem
          key={artist.id}
          artist={artist}
          index={index + 1}
          />
        ))}
      </ArtistsContainer>
    </TopContainer>
  )
}

export default TopArtistsPage