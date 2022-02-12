import styled, { useTheme } from "styled-components";

const StyledBox = styled.div`
  display: flex;
`;

interface BoxProps {
  children: React.ReactNode;
  onClick?: () => void;
  swatch?: keyof Swatches;
}
export const Box = ({ children, onClick, swatch }: BoxProps) => {
  const { swatches } = useTheme();

  return (
    <StyledBox
      onClick={onClick}
      style={{
        userSelect: "none",
        backgroundColor: swatch ? swatches[swatch].light : "transparent",
      }}
    >
      {children}
    </StyledBox>
  );
};
