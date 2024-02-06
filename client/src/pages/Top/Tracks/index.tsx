import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TopTracksContainer, TopTracksTitle, ButtonsContainer, TimeRangeButton, TopTrackItems } from './styles';
import TopTrackItem from '../../../components/TopTrackItem';
import PlaylistButton from '../../../components/PlaylistButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../state/store';
import { getTopTracksAsync } from '../../../state/spotify/spotifySlice';

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

const TopTracksPage = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const topTracks = useSelector((state: RootState) => state.spotify.topTracks);
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(searchParams.get('time_range') as TimeRange || 'short_term');

  useEffect(() => {
    dispatch(getTopTracksAsync({accessToken, timeRange}));
  }, [timeRange, accessToken, dispatch]);

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange as TimeRange);
    setSearchParams({ time_range: newTimeRange });
  };

  // TODO: create constant for buttonsData and create hook for handling button's click and component for buttons
  const buttonsData = [
    { label: '4 weeks', value: 'short_term' },
    { label: '6 months', value: 'medium_term' },
    { label: 'All time', value: 'long_term' },
  ];

  const getButtonText = () => {
    return buttonsData.find((button) => button.value === timeRange)?.label || '4 weeks';
  }

  return (
    <TopTracksContainer>
      <TopTracksTitle>Top Tracks of {getButtonText()}</TopTracksTitle>
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
        {topTracks?.map((topTrack, index) => (
          <TopTrackItem key={topTrack.id} track={topTrack} index={index} />
        ))}
      </TopTrackItems>
      { topTracks && 
      <PlaylistButton tracks={topTracks} timeRange={getButtonText()}/> }
    </TopTracksContainer>
  );
};

export default TopTracksPage;