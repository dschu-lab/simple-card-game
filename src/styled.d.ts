import "styled-components";

interface ISwatch {
  light: string;
  dark: string;
}

declare global {
  interface Swatches {
    yellow: ISwatch;
    pink: ISwatch;
    dream: ISwatch;
    ice: ISwatch;
  }
  type SwatchKeys = keyof Swatches;

  interface SizeValue {
    small: string;
    medium: string;
    large: string;
  }
  type SizeValueKeys = "none" | keyof SizeValue;
}

declare module "styled-components" {
  export interface DefaultTheme {
    swatches: Swatches;
    spacing: SizeValue;
    border: {
      radius: SizeValue;
    };
  }
}
