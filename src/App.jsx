import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MoonLoader from "react-spinners/MoonLoader";

import theme from "./components/themes";
import GlobalStyle from "./components/themes/GlobalStyle";
import MainPage from "./pages/MainPage";
import GlobalModal from "./components/GlobalModal";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import MapPage from "./pages/MapPage";
import CountryPage from "./pages/CountryPage";
import MyPage from "./pages/MyPage";
import SpinnersWrapper from "./components/themes/SpinnersWrapper";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense
        fallback={
          <SpinnersWrapper>
            <MoonLoader />
          </SpinnersWrapper>
        }
      >
        <ErrorBoundary
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <GlobalModal />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:photoId" element={<PhotoDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/country/:countryId" element={<CountryPage />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
