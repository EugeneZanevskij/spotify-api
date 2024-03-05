import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  TopContainer,
  TopTitle,
  ButtonsContainer,
  TimeRangeButton,
} from "./styles";
import { TimeRange } from "../../../types";
import TopArtistItems from "../../../components/TopArtistItems";

const TopArtistsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<TimeRange>(
    (searchParams.get("time_range") as TimeRange) || "short_term",
  );

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
            active={timeRange === button.value ? "true" : "false"}
            onClick={() => handleTimeRangeChange(button.value)}
          >
            {button.label}
          </TimeRangeButton>
        ))}
      </ButtonsContainer>
      <TopArtistItems timeRange={timeRange} />
    </TopContainer>
  );
};

export default TopArtistsPage;
