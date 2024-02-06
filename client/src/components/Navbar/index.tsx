import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // TODO: add linter into app, please
import LogoImage from "../../assets/Logo.png";
import {
  NavbarContainer,
  NavLogo,
  Logo,
  NavLinks,
  NavItem,
  NavLink,
  BurgerMenu,
} from "./styles";
import { navLinks } from "../../constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer>
      <NavLogo to="/">
        <Logo src={LogoImage} />
        SpotiStats
      </NavLogo>
      <BurgerMenu size={28} onClick={toggleMenu} />
      <NavLinks open={isOpen}>
        {navLinks.map((navLink) => (
          <NavItem key={navLink.name}>
            <NavLink to={navLink.path}>{navLink.name}</NavLink>
          </NavItem>
        ))}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
