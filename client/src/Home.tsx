import React from 'react'

const Home = ({ token }: { token: string }) => {
  return (
    <div>
      <h1>Spotify API</h1>
      {!token && <a href="http://localhost:7000/login">Login</a>}
    </div>
  )
}

export default Home