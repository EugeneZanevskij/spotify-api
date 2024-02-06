import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/logout");
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
