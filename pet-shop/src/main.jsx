import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { CartProvider } from './contexts/CartContext.jsx';
import { LoginStatusProvider } from './contexts/LoginContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <LoginStatusProvider>
        <BrowserRouter>
        <ProductProvider>
          <App />
        </ProductProvider>
        </BrowserRouter>
      </LoginStatusProvider>
    </CartProvider>
  </React.StrictMode>,
)