import styled from "styled-components";
import { TError } from "../types";
import Login from "./Login";

const ErrorContainer = styled.div`
  border: 2px solid #ff0000;
  padding: 1rem;
  background-color: #ffeeee;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorStatus = styled.p`
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

const Error: React.FC<{ error: TError }> = ({ error }: { error: TError }) => {
  return (
    <ErrorContainer>
      <ErrorStatus>{error.status}</ErrorStatus>
      <ErrorMessage>{error.message}</ErrorMessage>
      {error.status === 401 && <Login />}
    </ErrorContainer>
  );
};

export default Error;
