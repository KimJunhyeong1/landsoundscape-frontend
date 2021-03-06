import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import DebugObserver from "./components/DebugObserver";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const renderApp = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <DebugObserver />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(renderApp());

serviceWorkerRegistration.register();
