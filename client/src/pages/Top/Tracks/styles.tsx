import styled from "styled-components";

const TopTracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const TopTracksTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const ButtonsContainer = styled.div`
  margin-top: 16px;
`;

const TimeRangeButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#333" : "#ccc")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const TopTrackItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
`;

export {
  TopTracksContainer,
  TopTracksTitle,
  ButtonsContainer,
  TimeRangeButton,
  TopTrackItems,
};
