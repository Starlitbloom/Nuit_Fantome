// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";

import ProductosPage from "./pages/ProductosPage";
import ProductoDetallePage from "./pages/ProductoDetallePage";
import CategoriasPage from "./pages/CategoriasPage";

import CarritoPage from "./pages/CarritoPage";
import CheckoutPage from "./pages/CheckoutPage";
import BoletaPage from "./pages/BoletaPage";
import PagoPage from "./pages/PagoPage";

import NosotrosPage from "./pages/NosotrosPage";

// 404 simple
const NotFound = () => <div style={{padding:24}}>Página no encontrada</div>;

function App() {
  return (
<<<<<<< Updated upstream
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Rutas del panel admin */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
=======
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/nosotros" element={<NosotrosPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Tienda */}
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/producto/:id" element={<ProductoDetallePage />} />
      <Route path="/categorias" element={<CategoriasPage />} />

      {/* Compra */}
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutPage" element={<Navigate to="/checkout" replace />} />

      {/* Boleta (con y sin id) */}
      <Route path="/boleta" element={<BoletaPage />} />
      <Route path="/boleta/:id" element={<BoletaPage />} />

      <Route path="/pago" element={<PagoPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
>>>>>>> Stashed changes
  );
}

export default App;
