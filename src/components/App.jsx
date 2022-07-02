import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";

import theme from "./themes";
import GlobalStyle from "./themes/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/map" element={<></>} />
        <Route path="/my-page" element={<></>} />
        <Route path="/country" element={<></>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
