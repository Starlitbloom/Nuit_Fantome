import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import CarritoPage from './pages/CarritoPage'
import ProductosPage from "./pages/ProductosPage"; 
import ProductoPage from "./pages/ProductoPage";
import NosotrosPage from "./pages/NosotrosPage";
import BlogsPage from "./pages/BlogsPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
