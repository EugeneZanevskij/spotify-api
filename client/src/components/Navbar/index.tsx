import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import LogoImage from '../../assets/Logo.png';
import { NavbarContainer, NavLogo, Logo, NavLinks, NavItem, NavLink, BurgerMenu } from './styles';

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const links = [
    { name: 'Profile', path: '/profile' },
    { name: 'Search', path: '/search' },
    { name: 'Top Tracks', path: '/top/tracks' },
    { name: 'Top Artists', path: '/top/artists' },
    { name: 'Recently Played', path: '/recently-played' },
  ];

  return (
    <NavbarContainer>
      <NavLogo to="/">
        <Logo src={LogoImage} />
        SpotiStats
      </NavLogo>
      <BurgerMenu size={28} onClick={toggleMenu} />
      <NavLinks open={open}>
        {links.map(link => (
          <NavItem key={link.name}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </NavItem>
        ))}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;