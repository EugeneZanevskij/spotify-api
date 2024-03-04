import styled from "styled-components";
import { colors } from "../../../constants";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.5rem;
`;

const TopTitle = styled.h1`
  font-size: 1.5rem;
  color: ${colors.textColor};
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  margin-top: 1rem;
`;

const TimeRangeButton = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? colors.textColor : colors.borderColor};
  color: ${(props) => (props.active ? colors.bgColor : colors.textColor)};
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export {
  TopContainer,
  TopTitle,
  ButtonsContainer,
  TimeRangeButton,
  ArtistsContainer,
};
