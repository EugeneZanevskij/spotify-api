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

const SpotifyLink: React.FC<{ url: string, size?: number }> = ({ url, size = 24 }) => (
  <SpotifyIconLink href={url} target="_blank" rel="noopener noreferrer">
    <FaSpotify size={size}/>
  </SpotifyIconLink>
);

export default SpotifyLink;