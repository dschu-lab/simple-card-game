import styled, { css } from "styled-components";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5";

type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "initial"
  | "inherit";

const fontWeightMap = {
  h1: 900,
  h2: 900,
  h3: 600,
  h4: 600,
  h5: 100,
};

interface HeadingProps {
  as?: HeadingType;
  truncate?: boolean;
  textAlign?: TextAlign;
}

const StyledHeading = styled.h1<HeadingProps>`
  margin: 0 0 1em 0;
  font-weight: ${({ theme, as }) => (as ? fontWeightMap[as] : undefined)};
  white-space: pre-line;
  text-align: ${({ textAlign = "left" }) => textAlign};
  line-height: 1.5em;

  ${({ truncate = true }) =>
    truncate &&
    css`
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export { StyledHeading as Heading };
