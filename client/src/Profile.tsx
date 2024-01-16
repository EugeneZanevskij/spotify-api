import { useEffect, useState } from 'react';
import { UserProfile } from './types';

const Profile = ({ token }: { token: string }) => {
  const [profile, setProfile] = useState<UserProfile>();

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

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <img src={profile.images[0].url} alt={profile.display_name} />
          <p>Name: {profile.display_name}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;