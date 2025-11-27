import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SearchProvider } from "./context/SearchContext";
import { DrawerProvider } from "./context/DrawerContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DrawerProvider>
      <SearchProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </SearchProvider>
    </DrawerProvider>
  </StrictMode>
);
