import React from "react";
import "../assets/css/style.css";

function Header() {
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
              <button className="btn-acceder">ACCEDER</button>
              <div className="dropdown-content">
                <a href="/login">Iniciar Sesión</a>
                <a href="/register">Registrarse</a>
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

        <nav className="barra-tareas">
          <ul>
            <li><a href="/" className="active">INICIO</a></li>
            <li><a href="/productos">PRODUCTOS</a></li>
            <li><a href="/nosotros">NOSOTROS</a></li>
            <li><a href="/blogs">BLOGS</a></li>
            <li><a href="/contacto">CONTACTO</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
