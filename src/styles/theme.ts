export const theme = {
  colors: {
    brand: {
      gold: "#C9A227",
      goldDark: "#956F0E",
      goldLight: "#E7D27C",
      black: "#050505",
    },

    gold: {
      50: "#FBF7E8",
      100: "#F4E8B5",
      200: "#E7D27C",
      300: "#D8B94F",
      400: "#C9A227",
      500: "#B88A16",
      600: "#956F0E",
      700: "#72530A",
    },

    black: {
      50: "#F7F7F5",
      100: "#EBEBE7",
      200: "#D5D5CF",
      300: "#A8A8A0",
      400: "#73736C",
      500: "#44443F",
      600: "#282824",
      700: "#171715",
      800: "#0D0D0C",
      900: "#050505",
    },

    neutral: {
      ivory: "#FAF8F2",
      cream: "#F4EFE3",
      champagne: "#E8DCC4",
      sand: "#D8C8AA",
      taupe: "#9B8D79",
      brown: "#5B4A38",
      white: "#FFFFFF",
    },

    semantic: {
      success: "#3D7A57",
      warning: "#B8860B",
      error: "#B63A3A",
      info: "#496B8A",
    },

    background: {
      primary: "#FAF8F2",
      secondary: "#F4EFE3",
      dark: "#050505",
      darkSoft: "#0D0D0C",
      card: "#FFFFFF",
    },

    text: {
      primary: "#171715",
      secondary: "#5B5B54",
      muted: "#85857D",
      inverse: "#FFFFFF",
      gold: "#C9A227",
    },

    border: {
      light: "#E5E1D7",
      medium: "#D5D0C4",
      dark: "#2A2A27",
      gold: "#C9A227",
    },
  },

  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.7,
  },

  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
  },

  radii: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "18px",
    "2xl": "24px",
    pill: "9999px",
  },

  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.06)",
    md: "0 8px 24px rgba(0, 0, 0, 0.08)",
    lg: "0 16px 40px rgba(0, 0, 0, 0.12)",
    luxury: "0 20px 60px rgba(0, 0, 0, 0.16)",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
    slow: "400ms ease",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1440px",
  },

  layout: {
    maxWidth: "1280px",
    contentWidth: "1180px",
    headerHeight: "76px",
  },

  zIndex: {
    base: 1,
    dropdown: 100,
    sticky: 200,
    header: 300,
    drawer: 400,
    modal: 500,
    toast: 600,
  },
} as const;

export type AppTheme = typeof theme;