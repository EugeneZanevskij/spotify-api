import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";  // TODO: add linter into app, please
import LogoImage from '../../assets/Logo.png';
import { NavbarContainer, NavLogo, Logo, NavLinks, NavItem, NavLink, BurgerMenu } from './styles';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // TODO: I would move it to constants or paths
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Search', path: '/search' },
    { name: 'Top Tracks', path: '/top/tracks' },
    { name: 'Top Artists', path: '/top/artists' },
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
