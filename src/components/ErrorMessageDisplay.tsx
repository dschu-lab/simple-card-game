import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import styled from "styled-components";
import { Heading } from "./layout/Heading";

const DisplayShell = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.large};
  position: absolute;
  width: 100vw;
`;

interface ErrorMessage {
  title: string;
  description: string;
}

export const ErrorMessageDisplay = () => {
  const { requests } = useContext(AppContext);

  const errorMessages: ErrorMessage[] = [];

  if (requests.fetching.hasErrored) {
    errorMessages.push({
      title: "Error during fetch",
      description: requests.fetching.errorMessage,
    });
  }
  if (requests.updating.hasErrored) {
    errorMessages.push({
      title: "Error during update",
      description: requests.updating.errorMessage,
    });
  }

  if (errorMessages.length > 0) {
    return (
      <DisplayShell>
        {errorMessages.map((message, index) => (
          <>
            <Heading key={index} as="h2" textAlign="center" truncate={false}>
              {message.title}
            </Heading>
            <Heading key={index} as="h3" textAlign="center" truncate={false}>
              {message.description}
            </Heading>
          </>
        ))}
      </DisplayShell>
    );
  } else {
    return null;
  }
};
