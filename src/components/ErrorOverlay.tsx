import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import styled from "styled-components";
import { Heading } from "./layout/Heading";
import { animated, useTransition } from "@react-spring/web";

const DisplayShell = styled(animated.div)`
  background-color: ${({ theme }) => theme.bgColor};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.large};
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }) => theme.layer.overlay};
`;

export const ErrorOverlay = () => {
  const { requests } = useContext(AppContext);

  const transition = useTransition(requests.fetching.hasErrored, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition(
    (styles, item) =>
      item && (
        <DisplayShell style={styles}>
          <Heading as="h2" textAlign="center" truncate={false}>
            {"Error during fetch"}: {requests.fetching.errorMessage}
          </Heading>
          <Heading as="h5" textAlign="center" truncate={false}>
            {"Please reload the page to try again."}
          </Heading>
        </DisplayShell>
      )
  );
};
