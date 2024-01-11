import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Navbar from './Navbar';
import './App.css';

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home token={accessToken} />} />
          <Route path="/profile" element={<Profile token={accessToken} />} />
        </Routes>
      </BrowserRouter>
      {/* <a href="http://localhost:7000/login">Login</a> */}
      {/* {accessToken && <Profile token={accessToken}/>} */}
    </div>
  )
}

export default App