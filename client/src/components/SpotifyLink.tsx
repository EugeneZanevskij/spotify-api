import styled from 'styled-components';
import { FaSpotify } from 'react-icons/fa';

const SpotifyIconLink = styled.a`
  display: inline-block;
  width: 24px;
  height: 24px;
  text-decoration: none;
  color: green;
  margin-top: 0.25rem;
`;

const SpotifyLink = ({ url }: { url: string }) => (
  <SpotifyIconLink href={url} target="_blank" rel="noopener noreferrer">
    <FaSpotify size={24}/>
  </SpotifyIconLink>
);

export default SpotifyLink;