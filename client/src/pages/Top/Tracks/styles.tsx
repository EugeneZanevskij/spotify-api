import styled from "styled-components";
import { colors } from "../../../constants";

const TopTracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const TopTracksTitle = styled.h1`
  font-size: 1.5rem;
  color: ${colors.textColor};
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  margin-top: 1rem;
`;

const TimeRangeButton = styled.button<{ active: string }>`
  background-color: ${(props) =>
    props.active === "true" ? colors.textColor : colors.borderColor};
  color: ${(props) =>
    props.active === "true" ? colors.bgColor : colors.textColor};
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export {
  TopTracksContainer,
  TopTracksTitle,
  ButtonsContainer,
  TimeRangeButton,
};
