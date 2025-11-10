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
import PedidosPage from "./pages/admin/PedidosPage";
import AdminProductosPage from "./pages/admin/AdminProductosPage";

// Página 404 simple
const NotFound = () => (
  <div style={{ padding: 24, textAlign: "center", color: "#3a2a63" }}>
    <h2>Página no encontrada</h2>
    <p>La ruta que intentas acceder no existe.</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/nosotros" element={<NosotrosPage />} />

      {/* Autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Panel de administración */}
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/pedidos" element={<PedidosPage />} />
      <Route path="/admin/productos" element={<AdminProductosPage/>} />
      

      {/* Tienda */}
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/producto/:id" element={<ProductoDetallePage />} />
      <Route path="/categorias" element={<CategoriasPage />} />

      {/* Compra */}
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutPage" element={<Navigate to="/checkout" replace />} />

      {/* Boleta (con y sin ID) */}
      <Route path="/boleta" element={<BoletaPage />} />
      <Route path="/boleta/:id" element={<BoletaPage />} />

      {/* Pago */}
      <Route path="/pago" element={<PagoPage />} />

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
