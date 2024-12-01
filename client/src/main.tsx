import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GridBackground>
      <App />
    </GridBackground>
  </BrowserRouter>
);
