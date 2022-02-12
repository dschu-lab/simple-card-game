import { Controls } from "./Controls";
import { Details } from "./Details";
import { Overview } from "./Overview";
import { AppContextProvider } from "../contexts/AppContext";
import { ErrorMessageDisplay } from "./ErrorMessageDisplay";
import { theme } from "../style/theme";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

const AppShell = styled.main`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.large};
  height: 100vh;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContextProvider>
        <ErrorMessageDisplay />
        <AppShell>
          <Details />
          <Controls />
          <Overview />
        </AppShell>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
