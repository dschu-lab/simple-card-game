import { animated, useSpring } from "@react-spring/web";
import styled, { DefaultTheme, useTheme } from "styled-components";

interface StyledButtonProps {
  isActive?: boolean;
  swatch?: SwatchKey;
}
const StyledButton = styled(animated.button)<StyledButtonProps>`
  position: relative;
  overflow: hidden;
  border: 0 none;
  border-radius: 18px;
  padding: 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  gap: ${({ theme }) => theme.spacing.medium};

  &:not([disabled]) {
    &:hover {
      cursor: pointer;
    }
  }
`;

const springProps = (
  theme: DefaultTheme,
  isActive: boolean | undefined,
  isDisabled: boolean | undefined
) => ({
  color: isActive ? theme.inverted : theme.primary,
  backgroundColor: isDisabled
    ? "transparent"
    : isActive
    ? theme.swatches.pink.dark
    : theme.inverted,
  borderColor:
    isDisabled || !isActive ? theme.inverted : theme.swatches.pink.dark,
  borderStyle: "dashed",
  borderWidth: 1,
});

interface ButtonProps extends StyledButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: any;
}
const Button = ({
  children,
  disabled,
  onClick,
  isActive,
  style,
}: ButtonProps) => {
  const theme = useTheme();

  const styles = useSpring(springProps(theme, isActive, disabled));

  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      style={{ ...style, ...styles }}
    >
      {children}
    </StyledButton>
  );
};

export { Button };
