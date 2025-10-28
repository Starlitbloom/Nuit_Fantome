import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
//import ProductosPage from "./pages/ProductosPage";
//import NosotrosPage from "./pages/NosotrosPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
