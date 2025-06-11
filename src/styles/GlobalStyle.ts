// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "DM Serif Display", serif;
    font-weight: 200;
    font-style: italic;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
