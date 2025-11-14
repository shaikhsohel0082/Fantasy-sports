import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FantasyProvider } from "./context/FantasyContext.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <FantasyProvider>
      <App />
      </FantasyProvider>
    </StrictMode>
  </BrowserRouter>
);
