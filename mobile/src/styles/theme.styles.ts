import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { styledBoxShadow } from "./global.style";

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  backgroundColor: "#DFD3BB",
  styledBoxShadow,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};
