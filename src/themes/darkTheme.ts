import { theme } from "@/styles";


export const darkTheme = {
  ...theme,

  colors: {
    ...theme.colors,

    background: {
      ...theme.colors.background,
      primary: "#0D0D0C",
      secondary: "#171715",
      card: "#171715",
      dark: "#050505",
      darkSoft: "#0D0D0C",
    },

    text: {
      ...theme.colors.text,
      primary: "#F7F7F5",
      secondary: "#C5C5BD",
      muted: "#92928A",
      inverse: "#050505",
      gold: "#D8B94F",
    },

    border: {
      ...theme.colors.border,
      light: "#2A2A27",
      medium: "#3A3A35",
    },
  },
};