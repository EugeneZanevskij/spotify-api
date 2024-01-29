import styled from 'styled-components';
import { PageText } from '../../helpers/PageText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
`;

const Text = styled(PageText)`
  color: ${({ color }) => color ?? '#131A22'}; // TODO: I would add a var here and in other places instead of '#131A22'
  font-size: ${(props) => props.fontSize ? props.fontSize : ".9em"};
`;

const BoldText = styled(Text)`
  font-weight: bold;
  padding: .4em;
`;

export { Container, Title, ProfileImage, Text, BoldText }
