import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/global'
import Profile from './Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SearchPage from './pages/Search';
import TopTracksPage from './pages/Top/Tracks';
import TopArtistsPage from './pages/Top/Artists';

const App = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  
  useEffect(() => {
    async function getToken() {
      const response = await fetch('http://localhost:7000/token');
      const json = await response.json();
      setAccessToken(json.access_token as string);
    }

    getToken();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home token={accessToken} />} />
          <Route path="/profile" element={<Profile token={accessToken} />} />
          <Route path='/search' element={<SearchPage token={accessToken} />} />
          <Route path='/top'>
            <Route path='tracks' element={<TopTracksPage token={accessToken} />} />
            <Route path='artists' element={<TopArtistsPage token={accessToken} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <a href="http://localhost:7000/login">Login</a> */}
      {/* {accessToken && <Profile token={accessToken}/>} */}
    </div>
  )
}

export default App