import React from 'react'
import { Container, Wrapper, SpotiContainer, BoldText, Text, LoginLink } from './styles';

const Home = ({ token }: { token: string }) => {
  return (
    <Container>
      <SpotiContainer>
      <BoldText fontSize='1.5em'>Spotify API</BoldText>
      <Text textAlign='center'>
        Please login with your spotify account, to see your track or artist ranking!
      </Text>
      {!token && <LoginLink href="http://localhost:7000/login">Login</LoginLink>}
      </SpotiContainer>
      <Wrapper>
        1
      </Wrapper>
    </Container>
  )
}

export default Home