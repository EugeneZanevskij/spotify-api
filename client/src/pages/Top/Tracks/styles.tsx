import styled from 'styled-components';

const TopTracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopTracksTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

const TrackName = styled.span`
  font-size: 16px;
  color: #333;
`;

const ButtonsContainer = styled.div`
  margin-top: 16px;
`;

const TimeRangeButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#333' : '#ccc')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
`;

export { TopTracksContainer, TopTracksTitle, TrackItem, TrackImage, TrackName, ButtonsContainer, TimeRangeButton };