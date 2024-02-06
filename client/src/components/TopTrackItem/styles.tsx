import styled from "styled-components";
import { ItemWrapper } from "../../helpers/ItemWrapper";
import { PageText } from "../../helpers/PageText";

const TrackItem = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr 3rem;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`;

const TrackContainer = styled(ItemWrapper)`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  justify-content: space-between;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => (props.gap ? props.gap : "0.5rem")};
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Text = styled(PageText)`
  color: ${(props) => (props.color ? props.color : "#131A22")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

const BoldText = styled(Text)`
  font-weight: bold;
  padding: 0.4em;
`;

export { TrackItem, TrackContainer, TrackImage, Text, BoldText };
