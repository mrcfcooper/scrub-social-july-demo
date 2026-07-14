import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "./index.css";
import App from "./app-shell.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
