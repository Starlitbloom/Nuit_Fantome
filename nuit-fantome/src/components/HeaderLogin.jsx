import React, { useState, useEffect } from "react";
import "../assets/css/style.css";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Barra superior */}
      <div className="top-bar">
        <div className="info-envios">
          <span>ENVÍOS GRATIS DESDE $24.990</span>
        </div>
        <div className="derecha-redes-sociales">
          <a href="/cambios">Cambios o Devoluciones</a>
          <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope"></i></a>
        </div>
      </div>

      <header>
        {/* Fila superior */}
        <div className="header-superior">
          <span className="spark s1"></span><span className="spark s2"></span>
          <span className="spark s3"></span><span className="spark s4"></span>

          <div className="logo">
            <a href="/">
              <img src="/assets/img/logo.png" alt="Logo Nuit Fantome" />
            </a>
          </div>

          <div className="busqueda">
            <form action="/productos" method="get">
              <input type="text" name="buscar" placeholder="Buscar productos..." />
              <button type="submit"><i className="bi bi-search"></i></button>
            </form>
          </div>

          <div className="usuario-carrito">
            <div className="dropdown">
              <button className="btn-acceder" onClick={toggleMenu}>
                MI CUENTA
              </button>

              {/* Menú desplegable controlado por estado */}
              <div className={`dropdown-content ${menuAbierto ? "visible" : ""}`}>
                <NavLink to="/desk">Escritorio</NavLink>
                <NavLink to="/direction">Direccion</NavLink>
              </div>
            </div>

            <a href="/carrito" style={{ textDecoration: "none" }}>
              <div className="carrito">
                <i className="bi bi-bag"></i>
                <span className="contador" id="contador">0</span>
              </div>
            </a>
          </div>
        </div>

        {/* --- Menú principal --- */}
        <nav className="barra-tareas">
          <ul>
            <li><NavLink to="/" end>INICIO</NavLink></li>
            <li><NavLink to="/productos">PRODUCTOS</NavLink></li>
            <li><NavLink to="/categorias">CATEGORÍAS</NavLink></li>
            <li><NavLink to="/nosotros">NOSOTROS</NavLink></li>
            <li><NavLink to="/blogs">BLOGS</NavLink></li>
            <li><NavLink to="/contacto">CONTACTO</NavLink></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
