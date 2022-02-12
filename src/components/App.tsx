import { ReactNode, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { animated, useTransition } from "@react-spring/web";
import { Controls } from "./Controls";
import { Details } from "./Details";
import { Overview } from "./Overview";
import { AppContext, AppContextProvider } from "../contexts/AppContext";
import { ErrorMessageDisplay } from "./ErrorMessageDisplay";
import { theme } from "../style/theme";
import { GlobalStyle } from "./GlobalStyle";
import { Heading } from "./layout/Heading";
import { ToastMessageContextProvider } from "../contexts/ToastMessageContext";
import { ToastMessageDisplay } from "./ToastMessageDisplay";

const AnimatedLoadingOverlay = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const StyledShell = styled(animated.main)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.large};
  height: 100vh;
`;

const AppShell = ({ children }: { children?: ReactNode }) => {
  const { cards, requests } = useContext(AppContext);

  const transitions = useTransition(
    requests.fetching.isActive || cards.length === 0,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  return transitions((styles, isFetching) =>
    isFetching ? (
      <AnimatedLoadingOverlay style={styles}>
        <Heading>{"LOADING"}</Heading>
      </AnimatedLoadingOverlay>
    ) : (
      <StyledShell style={styles}>{children}</StyledShell>
    )
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastMessageContextProvider>
        <AppContextProvider>
          <ToastMessageDisplay />
          <ErrorMessageDisplay />
          <AppShell>
            <Details />
            <Controls />
            <Overview />
          </AppShell>
        </AppContextProvider>
      </ToastMessageContextProvider>
    </ThemeProvider>
  );
};

export default App;
