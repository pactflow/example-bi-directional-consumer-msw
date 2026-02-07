import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import ProductPage from './ProductPage'
import ErrorBoundary from './ErrorBoundary'

const routing = (
  <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
)

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(routing)
