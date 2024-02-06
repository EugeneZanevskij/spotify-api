import LogoutButton from "../../components/LogoutButton";
import Login from "../../components/Login";
import {
  HomeContainer,
  Wrapper,
  SpotiContainer,
  BoldText,
  Text,
  TopLink,
  PropsWrapper,
} from "./styles";
import { homepageProps } from "../../constants";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Home = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <HomeContainer>
      <SpotiContainer>
        <BoldText fontSize="1.5em">Spotify API</BoldText>
        {!accessToken ? (
          <>
            <Text fontSize="1em" textAlign="center">
              Please login with your spotify account, to search for tracks,
              albums or artists. You can see your track or artist ranking!
            </Text>
            <Login />
          </>
        ) : (
          <Wrapper>
            <BoldText fontSize="1.1em">See stats:</BoldText>
            <TopLink to="/top/tracks">Top Tracks</TopLink>
            <TopLink to="/top/artists">Top Artists</TopLink>
          </Wrapper>
        )}
        <LogoutButton />
      </SpotiContainer>
      <Wrapper>
        {homepageProps.map((homepageProp, index) => (
          <Wrapper flexDirection="row" key={index}>
            <homepageProp.icon size={48} />
            <PropsWrapper>
              <BoldText fontSize="1.1em">{homepageProp.title}</BoldText>
              <Text fontSize="1em">{homepageProp.description}</Text>
            </PropsWrapper>
          </Wrapper>
        ))}
      </Wrapper>
    </HomeContainer>
  );
};

export default Home;
