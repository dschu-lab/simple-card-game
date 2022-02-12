import styled from "styled-components";

interface StyledButtonProps {
  isActive?: boolean;
  swatch?: SwatchKeys;
}
const StyledButton = styled.button<StyledButtonProps>`
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  background-color: ${({ theme, swatch = "pink", isActive }) =>
    isActive ? theme.swatches[swatch].dark : "white"};

  border: 0 none;
  border-radius: 18px;
  padding: 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};

  &:not([disabled]) {
    &:hover {
      cursor: pointer;
    }
  }

  &[disabled] {
    background: transparent;
    border-color: gray;
    border-style: dashed;
    border-width: 1px;
  }
`;

export { StyledButton as Button };
