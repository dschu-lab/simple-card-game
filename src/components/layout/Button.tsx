import styled from "styled-components";
import { swatchGradient } from "../../style/theme";

interface StyledButtonProps {
  isActive?: boolean;
  swatch?: SwatchKeys;
}
const StyledButton = styled.button<StyledButtonProps>`
  /* background: ${({ theme, swatch = "yellow", isActive }) =>
    isActive ? swatchGradient(theme, swatch) : "white"}; */
  color: ${({ theme, swatch = "pink", isActive }) =>
    isActive ? "white" : "black"};
  background-color: ${({ theme, swatch = "pink", isActive }) =>
    isActive ? theme.swatches[swatch].dark : "white"};

  border: 0 none;
  border-radius: 18px;
  padding: 10px;
  font-weight: 600;

  &[disabled] {
    background: transparent;
    border-color: gray;
    border-style: dashed;
    border-width: 1px;
  }
`;

export { StyledButton as Button };
