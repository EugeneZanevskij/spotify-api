import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(242, 242, 242);
  padding: 1rem 1.5rem;
`;

export const Logo = styled.img`
  width: 3rem;
  cursor: pointer;

  &:hover {
    border: 1px solid #ffffff;
    border-radius: 0.2em;
  }
`;

export const NavLogo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #000000;
`;

export const NavLinks = styled.ul<{ open: boolean }>`
  list-style-type: none;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 5rem;
    right: 0;
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
  }
`;

export const NavItem = styled.li`
  width: 100%;
  padding: 0 10px;

  @media (max-width: 768px) {
    padding: 10px;
    background-color: #c4edc0;

    &:hover {
      background-color: #2d8d2b;
      color: #000000;
    }
  }
`;

export const NavLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-weight: bold;

  &:hover {
  }
`;

export const BurgerMenu = styled(GiHamburgerMenu)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
