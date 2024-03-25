import Error from "../../components/Error";
import LogoutButton from "../../components/LogoutButton";
import SpotifyLink from "../../components/SpotifyLink";
import { Container, ProfileImage, Text, Title, BoldText } from "./styles";
import useUserProfileFromRedux from "./useUserFromRedux";

const Profile = () => {
  const { user, loading, error } = useUserProfileFromRedux();

  return (
    <Container>
      <Title>User Profile</Title>
      {loading && <Text fontSize="1.1em">Loading profile...</Text>}
      {error && (
        <>
          <BoldText fontSize="1.1em">Failed to fetch user profile</BoldText>
          <Error error={error} />
        </>
      )}
      {user?.display_name && (
        <>
          <ProfileImage src={user?.images[1].url} alt={user?.display_name} />
          <Text fontSize="1em">
            Name: <BoldText fontSize="1.2em">{user?.display_name}</BoldText>
          </Text>
          <Text fontSize="1.1em" color="gray">
            ID: {user?.id}
          </Text>
          <Text fontSize="1.1em" color="gray">
            Email: {user?.email}
          </Text>
          <Text fontSize="1.1em" color="gray">
            Country: {user?.country}
          </Text>
          <Text fontSize="1.1em" color="gray">
            Product: {user?.product}
          </Text>
          <SpotifyLink size={32} url={user?.external_urls.spotify} />
          <LogoutButton />
        </>
      )}
    </Container>
  );
};

export default Profile;
