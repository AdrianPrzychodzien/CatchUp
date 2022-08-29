import { useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { AppTheme } from "../types/theme.types";

export const useStyles = (styles: (theme: AppTheme) => ReturnType<typeof StyleSheet.create>) => {
  const theme = useTheme();

  return styles(theme);
};
