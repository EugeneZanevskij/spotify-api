import styled from "styled-components";
import { colors } from "../constants";

const Button = styled.button`
  background-color: ${colors.errorColor};
  color: ${colors.bgColor};
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  cursor: pointer;
`;

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/auth/logout");
      const data = await response.json();
      if (data.result === "SUCCESS") {
        alert("User logout operation success.");
        window.location.href = "/";
      } else {
        alert("User logout operation error (message: " + data.message + ").");
      }
    } catch (error) {
      alert("Error logging out" + error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
