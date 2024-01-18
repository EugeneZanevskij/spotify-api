import { HomeContainer, Wrapper, SpotiContainer, BoldText, Text, TopLink, PropsWrapper } from './styles';
import { FaSearch } from "react-icons/fa";
import { FaRankingStar, FaRepeat } from "react-icons/fa6";
import { BiSolidPlaylist } from "react-icons/bi";
import LogoutButton from '../../components/LogoutButton';
import Login from '../../components/Login';

const Home = ({ token }: { token: string }) => {
  const props = [
    {
      title: "Search",
      description: "Search for tracks, albums or artists by name switching between 3 categories for search.",
      icon: <FaSearch size={48} />
    },
    {
      title: "Your own ranking",
      description: "View your most listened tracks, artists and switch between 3 different time periods (4 weeks, 6 months and All time).",
      icon: <FaRankingStar size={48} />
    },
    {
      title: "Create playlist",
      description: "Create a playlist from your personal charts and listen to them directly in your spotify app.",
      icon: <BiSolidPlaylist size={48} />
    },
    {
      title: "Recently played tracks",
      description: "Check out your recently played tracks.",
      icon: <FaRepeat size={48} />
    }
  ];

  return (
    <HomeContainer>
      <SpotiContainer>
        <BoldText fontSize='1.5em'>Spotify API</BoldText>
        {!token ? 
        <>
          <Text fontSize='1em' textAlign='center'>
            Please login with your spotify account, to search for tracks, albums or artists. You can see your track or artist ranking!
          </Text>
          <Login />
        </> :
        <Wrapper>
          <BoldText fontSize='1.1em'>See stats:</BoldText>
          <TopLink to="/top/tracks">Top Tracks</TopLink>
          <TopLink to="/top/artists">Top Artists</TopLink>
        </Wrapper>
        }
        <LogoutButton />
      </SpotiContainer>
      <Wrapper>
        {props.map((prop, index) => (
          <Wrapper flexDirection='row' key={index}>
            {prop.icon}
            <PropsWrapper>
              <BoldText fontSize='1.1em'>{prop.title}</BoldText>
              <Text fontSize='1em'>{prop.description}</Text>
            </PropsWrapper>
          </Wrapper>
        ))}
      </Wrapper>
    </HomeContainer>
  )
}

export default Home