import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FantasyProvider } from "./context/FantasyContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <FantasyProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            position="top-right" 
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark" 
          />
          <App />
        </QueryClientProvider>
      </FantasyProvider>
    </StrictMode>
  </BrowserRouter>
);
