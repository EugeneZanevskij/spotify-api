import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { TopContainer, TopTitle, ButtonsContainer, TimeRangeButton, ArtistsContainer } from './styles';
import ArtistItem from '../../../components/ArtistItem';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../state/store';
import { getTopArtistsAsync } from '../../../state/spotify/spotifySlice';

const TopArtistsPage = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const topArtists = useSelector((state: RootState) => state.spotify.topArtists);
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<string>(searchParams.get('time_range') || 'short_term');

  useEffect(() => {
    dispatch(getTopArtistsAsync({ accessToken, timeRange }));
  }, [timeRange, accessToken, dispatch]);

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
        {topArtists?.map((topArtist, index) => (
          <ArtistItem
          key={topArtist.id}
          artist={topArtist}
          index={index + 1}
          />
        ))}
      </ArtistsContainer>
    </TopContainer>
  )
}

export default TopArtistsPage