import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ErrorBoundary
                fallbackRender={({ error }) => <div>{error.message}</div>}
              >
                <MainPage />
              </ErrorBoundary>
            </Suspense>
          }
        />
        <Route path="/map" element={<></>} />
        <Route path="/my-page" element={<></>} />
        <Route path="/country" element={<></>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
