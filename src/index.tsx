import ReactDom from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { ProductPage } from "./ProductPage.tsx";

const routing = (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDom.createRoot(rootElement);
root.render(routing);
