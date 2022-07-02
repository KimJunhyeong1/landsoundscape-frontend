import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

const renderApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = document.getElementById("root");
render(renderApp(), root);
