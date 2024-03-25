import styled from "styled-components";
import { TError } from "../types";
import Login from "./Login";
import { colors } from "../constants";

const ErrorContainer = styled.div`
  border: 2px solid ${colors.errorColor};
  padding: 1rem;
  background-color: ${colors.bgColor};
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
  color: ${colors.errorColor};
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
