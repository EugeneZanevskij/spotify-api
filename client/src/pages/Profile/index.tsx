import { useEffect, useState } from 'react';
import { UserProfile } from '../../types';
import LogoutButton from '../../components/LogoutButton';
import SpotifyLink from '../../components/SpotifyLink';
import { Container, ProfileImage, Text, Title, BoldText } from './styles';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [accessToken]);

  return (
    <Container>
      <Title>User Profile</Title>
      {profile?.display_name ? (
        <>
          <ProfileImage src={profile.images[1].url} alt={profile.display_name} />
          <Text fontSize='1em'>Name: <BoldText fontSize='1.2em'>{profile.display_name}</BoldText></Text>
          <Text fontSize='1.1em' color='gray'>ID: {profile.id}</Text>
          <Text fontSize='1.1em' color='gray'>Email: {profile.email}</Text>
          <Text fontSize='1.1em' color='gray'>Country: {profile.country}</Text>
          <Text fontSize='1.1em' color='gray'>Product: {profile.product}</Text>
          <SpotifyLink size={32} url={profile.external_urls.spotify} />
          <LogoutButton />
        </>
      ): (
        <Text fontSize='1.1em'>Loading profile...</Text>
      )}
    </Container>
  );
};

export default Profile;