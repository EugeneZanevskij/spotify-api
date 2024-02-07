import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  TopContainer,
  TopTitle,
  ButtonsContainer,
  TimeRangeButton,
  ArtistsContainer,
} from "./styles";
import ArtistItem from "../../../components/ArtistItem";
import { TimeRange } from "../../../types";
import useTopArtistsFromRedux from "./useTopArtistsFromRedux";

const TopArtistsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(
    (searchParams.get("time_range") as TimeRange) || "short_term",
  );
  const { topArtists, loading, error } = useTopArtistsFromRedux(timeRange);

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange as TimeRange);
    setSearchParams({ time_range: newTimeRange });
  };

  const buttonsData = [
    { label: "4 weeks", value: "short_term" },
    { label: "6 months", value: "medium_term" },
    { label: "All time", value: "long_term" },
  ];

  const getButtonText = () => {
    return (
      buttonsData.find((button) => button.value === timeRange)?.label ||
      "4 weeks"
    );
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
        {error && <h2>Error: Failed to fetch top artists</h2>}
        {loading && <h2>Loading top artists...</h2>}
        {topArtists?.map((topArtist, index) => (
          <ArtistItem key={topArtist.id} artist={topArtist} index={index + 1} />
        ))}
      </ArtistsContainer>
    </TopContainer>
  );
};

export default TopArtistsPage;
