import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import App from "./App";

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(renderApp());
