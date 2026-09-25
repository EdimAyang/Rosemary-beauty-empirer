import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.normal};

    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.primary};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    border: 0;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  h1,
  h2,
  h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 500;
  }

  ::selection {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: ${({ theme }) => theme.colors.brand.gold};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.gold};
    outline-offset: 3px;
  }
`;
