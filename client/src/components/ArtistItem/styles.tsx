import styled from "styled-components";
import { PageText } from "../../helpers/PageText";

const ArtistContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 15rem;
  width: 100%;
  text-align: center;
`;

const Text = styled(PageText)`
    color:${(props)=>props.color ? props.color :"#131A22" };
    font-size:${(props)=>props.fontSize ? props.fontSize :".9em" };
`;

const BoldText = styled(Text)`
    font-weight: bold;
    padding: .4em;
`;

const ImageContainer = styled.div`
    max-height: 13rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 0.5rem;
`
const Image = styled.img`
    max-width: 13rem;
    width: 100%;
`

export { ArtistContainer, Text, BoldText, ImageContainer, Image };