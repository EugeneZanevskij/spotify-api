import { useEffect } from 'react';
import LogoutButton from '../../components/LogoutButton';
import SpotifyLink from '../../components/SpotifyLink';
import { Container, ProfileImage, Text, Title, BoldText } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { getUserProfileAsync } from '../../state/spotify/spotifySlice';

const Profile = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.spotify.user);

  useEffect(() => {
    dispatch(getUserProfileAsync(accessToken));
  }, [accessToken, dispatch]);

  return (
    <Container>
      <Title>User Profile</Title>
      {user?.display_name ? (
          /* // TODO: I would support cases when profile could have not all keys from expected */
        <>
          <ProfileImage src={user?.images[1].url} alt={user?.display_name} />
          <Text fontSize='1em'>Name: <BoldText fontSize='1.2em'>{user?.display_name}</BoldText></Text>
          <Text fontSize='1.1em' color='gray'>ID: {user?.id}</Text>
          <Text fontSize='1.1em' color='gray'>Email: {user?.email}</Text>
          <Text fontSize='1.1em' color='gray'>Country: {user?.country}</Text>
          <Text fontSize='1.1em' color='gray'>Product: {user?.product}</Text>
          <SpotifyLink size={32} url={user?.external_urls.spotify} />
          <LogoutButton />
        </>
      ): (
        /* // TODO: if we got an error we always will see loading */
        <Text fontSize='1.1em'>Loading profile...</Text>
      )}
    </Container>
  );
};

export default Profile;
