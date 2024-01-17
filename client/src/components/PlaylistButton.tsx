import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Track } from '../types';
import SpotifyLink from './SpotifyLink';

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const PlaylistButton: React.FC<{ tracks: Track[], token: string }> = ({ tracks, token }) => {
  const [profileId, setProfileId] = useState<string>('');
  const [playlistUrl, setPlaylistUrl] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfileId(data.id);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const date = () => {
    const date = new Date();
    const month = date.toLocaleString('en', { month: 'short' });
    return `${date.getDate()} ${month} ${date.getFullYear()}`
  };

  const handleCreatePlaylist = async () => {
    const response = await fetch('https://api.spotify.com/v1/users/' + profileId + '/playlists', {
      method: 'POST',
      body: JSON.stringify({ 'name': `Top Tracks ${date()}` }),
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    const playlistId = data.id;
    setPlaylistUrl(data.external_urls.spotify);
    const playlistResponse = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
      method: 'POST',
      body: JSON.stringify({ 'uris': tracks.map(track => track.uri) }),
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(playlistResponse);
  };

  return (
    <>
    <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
    {playlistUrl && <SpotifyLink url={playlistUrl} />}
    </>
  );
};

export default PlaylistButton;