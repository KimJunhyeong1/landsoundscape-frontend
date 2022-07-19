import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

  *{
    box-sizing: border-box;
  }
  
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
    font-family: 'Playfair Display', serif;
  }
`;

export default GlobalStyle;
