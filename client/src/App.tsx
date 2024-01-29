import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/global'
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SearchPage from './pages/Search';
import TopTracksPage from './pages/Top/Tracks';
import TopArtistsPage from './pages/Top/Artists';
import Footer from './components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './state/store';
import { getTokenAsync } from './state/auth/authSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      dispatch(getTokenAsync());
    }
  }, [accessToken, dispatch]);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile token={accessToken} />} />
          <Route path='/search' element={<SearchPage token={accessToken} />} />
          <Route path='/top'>
            <Route path='tracks' element={<TopTracksPage token={accessToken} />} />
            <Route path='artists' element={<TopArtistsPage token={accessToken} />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
