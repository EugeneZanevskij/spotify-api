import styled from "styled-components";
import { PageText } from '../../helpers/PageText';

const SearchPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-block: 0.75rem;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #198c3e;
  }
`;

const SearchResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchResultItem = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: min-content;
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
    height: 13em;
    display: flex;
    align-items: center;
    overflow: hidden;
`
const Image = styled.img`
    width: 13em;
`

export { SearchPageWrapper, SearchForm, SearchInput, SearchButton, SearchResults, SearchResultItem, Text, BoldText, ImageContainer, Image };