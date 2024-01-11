import { useEffect, useState } from 'react';
import { UserProfile } from './types';

const Profile = ({ token }: { token: string }) => {
  const [profile, setProfile] = useState<UserProfile>();
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    async function fetchWebApi(endpoint: string, method: string, body?: object) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
      });
      return await res.json();
    }
    
    async function getTopTracks(){
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
      )).items;
    }

    fetchProfile();
    getTopTracks().then(data => setTracks(data));
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <img src={profile.images[0].url} alt={profile.display_name} />
          <p>Name: {profile.display_name}</p>
          {tracks?.map(track =>
      <p>{track.name} by {track.artists.map(artist => artist.name)}</p>
  )}
          {/* Render other profile data as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;