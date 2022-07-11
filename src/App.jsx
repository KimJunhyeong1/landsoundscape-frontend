import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import MainPage from "./pages/MainPage";
import GlobalModal from "./components/GlobalModal";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import MapPage from "./pages/MapPage";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense fallback={<h1>Loading...</h1>}>
        <ErrorBoundary
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <GlobalModal />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:photoId" element={<PhotoDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/my-page" element={<></>} />
            <Route path="/country/:countryId" element={<CountryPage />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
