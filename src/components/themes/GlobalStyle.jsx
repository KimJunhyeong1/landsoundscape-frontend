import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    @media only screen and (max-width: 767px) {
      font-size: 12px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
      font-size: 14px;
    }
    @media only screen and (min-width: 1200px){
      font-size: 16px;
    }
  }
  body {
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

export default GlobalStyle;
