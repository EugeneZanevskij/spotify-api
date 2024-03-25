import styled from "styled-components";
import { ItemWrapper } from "../../helpers/ItemWrapper";
import { PageText } from "../../helpers/PageText";
import { Link } from "react-router-dom";
import { colors } from "../../constants";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
`;

export const SpotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  width: 100%;
  border-radius: 2rem;
  max-width: 25rem;
  background-color: ${colors.tertiaryColor};
`;

export const Wrapper = styled(ItemWrapper)`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: 1rem;
`;

export const Text = styled(PageText)`
  color: ${(props) => (props.color ? props.color : colors.textColor)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
`;

export const BoldText = styled(Text)`
  font-weight: bold;
  padding: 0.4em;
`;

export const TopLink = styled(Link)`
  background-color: ${colors.topLinkColor};
  color: ${colors.bgColor};
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.yellowishColor};
    color: ${colors.textColor};
    border: ${colors.topLinkColor} 1px solid;
  }
`;

export const PropsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20rem;
  width: 100%;
`;
