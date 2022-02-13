import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

interface GlobalStyleProps {}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${normalize}

  html, body {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    min-height: 100%;
  }

  body {
    min-height:100%;
    background-color: ${({ theme }) => theme.bgColor};
    color: white;
  }
`;
