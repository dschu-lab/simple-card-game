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
  type SwatchKey = keyof Swatches;

  interface SizeValue {
    small: string;
    medium: string;
    large: string;
  }
  type SizeValueKey = "none" | keyof SizeValue;
}

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    inverted: string;
    swatches: Swatches;
    spacing: SizeValue;
    border: {
      radius: SizeValue;
    };
    layer: {
      base: number;
      navigation: number;
      super: number;
      overlay: number;
    };
  }
}
