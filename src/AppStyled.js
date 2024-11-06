import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 12px; 
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1rem; 
  }

  * {
    box-sizing: border-box;
  }

  input, button, select, textarea {
    font-size: 1rem; 
    padding: 0.5rem; 
  }

  label {
    font-size: 1rem; 
  }

  p {
    font-size: 1rem; 
  }
`;

export default GlobalStyles;
