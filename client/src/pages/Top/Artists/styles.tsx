import styled from 'styled-components';

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const TopTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
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

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap : 1.5rem;
  margin-top: 1.5rem;
`;

export { TopContainer, TopTitle, ButtonsContainer, TimeRangeButton, ArtistsContainer };