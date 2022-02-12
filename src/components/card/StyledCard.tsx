import styled from "styled-components";
import { swatchGradient } from "../../style/theme";

interface StyledOverviewCardProps {
  swatch?: SwatchKeys;
}

export const StyledCard = styled.div<StyledOverviewCardProps>`
  background: ${({ theme, swatch = "ice" }) => swatchGradient(theme, swatch)};
  border-radius: ${({ theme }) => theme.border.radius.large};
  flex-grow: 1;
  overflow: hidden;
  padding: ${({ theme }) => theme.border.radius.large};
`;

export const StyledInteractiveCard = styled(StyledCard)`
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;
