import styled from "styled-components";
import { PageText } from "../../helpers/PageText";

const SearchPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background-color: #8abd81;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #cbe669;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-block: 0.75rem;
  gap: 0.75rem;
`;

const SearchInputs = styled.div`
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.25rem;
  margin-left: 1rem;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 0.25rem;
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

const Text = styled(PageText)`
  color: ${(props) => (props.color ? props.color : "#131A22")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : ".9em")};
`;

const BoldText = styled(Text)`
  font-weight: bold;
  padding: 0.4em;
`;

export {
  SearchPageWrapper,
  ButtonContainer,
  StyledButton,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchResults,
  BoldText,
  SearchInputs,
};
