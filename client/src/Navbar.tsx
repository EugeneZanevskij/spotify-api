import React from 'react'
import { Link } from 'react-router-dom';

const Navbar : React.FC = () => {
  const links : { name: string, path: string }[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Profile',
      path: '/profile'
    }
  ];
  return (
    <nav className="navbar">
      <ul className="nav-links">
      {links.map(link => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Navbar