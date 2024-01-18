import styled from "styled-components";

const LoginLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    background-color: #10551e;
    border-radius: 1em;
`;

const Login = () => {
  return (
    <LoginLink href="http://localhost:7000/login">Login</LoginLink>
  )
}

export default Login;