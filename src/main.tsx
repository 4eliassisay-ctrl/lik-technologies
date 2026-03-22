import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Hero from "./Hero";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Hero />
    <App />
  </BrowserRouter>
);