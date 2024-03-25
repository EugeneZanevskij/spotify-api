import styled from "styled-components";
import { colors } from "../constants";

const LoginLink = styled.a`
  text-decoration: none;
  color: ${colors.bgColor};
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: ${colors.primaryColor};
  border-radius: 1em;
`;

const Login = () => {
  return (
    <LoginLink href="http://localhost:7000/api/auth/login">Login</LoginLink>
  );
};

export default Login;
