import ReactDom from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { ProductPage } from "./ProductPage.tsx";

// Enable MSW in development mode
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.ts");
    return worker.start();
  }
}

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

enableMocking().then(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  const root = ReactDom.createRoot(rootElement);
  root.render(routing);
});
