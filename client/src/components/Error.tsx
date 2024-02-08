import styled from "styled-components";
import { TError } from "../types";

const ErrorContainer = styled.div`
  border: 2px solid #ff0000;
  padding: 10px;
  background-color: #ffeeee;
  border-radius: 5px;
`;

const ErrorStatus = styled.p`
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  margin-top: 5px;
`;

const Error: React.FC<{ error: TError }> = ({ error }: { error: TError }) => {
  return (
    <ErrorContainer>
      <ErrorStatus>{error.status}</ErrorStatus>
      <ErrorMessage>{error.message}</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;
