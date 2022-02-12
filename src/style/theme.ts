import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  primary: "#000000",
  inverted: "#ffffff",
  swatches: {
    yellow: {
      light: "#f6d365",
      dark: "#fda085",
    },
    pink: {
      light: "#f093fb",
      dark: "#f5576c",
    },
    dream: {
      light: "#5ee7df",
      dark: "#b490ca",
    },
    ice: {
      light: "#c3cfe2",
      dark: "#c3cfe2",
    },
  },
  spacing: {
    small: "5px",
    medium: "10px",
    large: "15px",
  },
  border: {
    radius: {
      small: "5px",
      medium: "18px",
      large: "25px",
    },
  },
  layer: {
    base: 1,
    navigation: 10,
    super: 100,
    overlay: 1000,
  },
};

export const swatchGradient = (theme: DefaultTheme, swatch: SwatchKey) =>
  `linear-gradient(135deg, ${theme.swatches[swatch].light} 0%, ${theme.swatches[swatch].dark} 100%)`;
