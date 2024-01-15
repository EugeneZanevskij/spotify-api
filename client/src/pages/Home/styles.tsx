import styled from "styled-components";
import { ItemWrapper } from "../../helpers/ItemWrapper";
import { PageText } from "../../helpers/PageText";

export const Container = styled.div`
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
  gap: 1rem;
  width: 100%;
  border-radius: 2rem;
  max-width: 25rem;
  background-color: #b8efb8;
`;

export const Wrapper = styled(ItemWrapper)`
  display: flex;
  flex-direction: ${(props)=>props.flexDirection ?  props.flexDirection  : "column"};
  align-items:  ${(props)=>props.alignItems ? props.alignItems  : "center"};
  gap: 0.5rem;
`;

export const Text = styled(PageText)`
    color:${(props)=>props.color ? props.color :"#131A22" };
    font-size:${(props)=>props.fontSize ? props.fontSize :".9em" };
    text-align:${(props)=>props.textAlign ? props.textAlign : "left" };
`;

export const BoldText = styled(Text)`
    font-weight: bold;
    padding: .4em;
`;

export const LoginLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    background-color: #10551e;
    border-radius: 1em;
`;