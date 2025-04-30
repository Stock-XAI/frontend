// src/styles/theme.ts
export const lightTheme = {
  systemColor: {
    black: "#121212",
    white: "#ffffff",
  },
  grayColor: {
    gray100: "#f0f0f0",
    gray200: "#e0e0e0",
    gray300: "#c0c0c0",
    gray400: "#a0a0a0",
    gray500: "#808080",
    gray600: "#606060",
    gray700: "#404040",
    gray800: "#202020",
  },
};

export const darkTheme = {
  systemColor: {
    black: "#121212",
    white: "#ffffff",
  },
  grayColor: {
    gray100: "#f0f0f0",
    gray200: "#e0e0e0",
    gray300: "#c0c0c0",
    gray400: "#a0a0a0",
    gray500: "#808080",
    gray600: "#606060",
    gray700: "#404040",
    gray800: "#202020",
  },
};

export type ThemeType = typeof lightTheme; // 타입 추론용
