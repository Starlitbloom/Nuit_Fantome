import React from "react";
import "../assets/css/style3.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LoginPage() {
  return (
    <>
      {/* Barra superior */}
      <div className="top-bar">
        <div className="info-envios">
          <span>ENVÍOS GRATIS DESDE $24.990</span>
        </div>
        <div className="derecha-redes-sociales">
          <a href="/cambios">Cambios o Devoluciones</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="mailto:contacto@nuitfantome.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Main - Login */}
      <main>
        <section className="login-section">
          <div className="login-container">
            {/* Izquierda: iniciar sesión */}
            <div className="login-left">
              <div className="login-box">
                <p className="login-subtitle">INGRESA A</p>
                <h2 className="login-title">Nuit Fantome</h2>

                <form id="login-form" noValidate>
                  <div className="input-container">
                    <i className="bi bi-envelope-at-fill"></i>
                    <input type="text" id="email" placeholder="Correo" />
                    <span className="error-message" id="email-error"></span>
                  </div>

                  <div className="input-container">
                    <i className="bi bi-lock-fill"></i>
                    <input
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                    />
                    <span className="error-message" id="password-error"></span>
                  </div>

                  <div className="remember">
                    <input type="checkbox" id="recuerdame" />
                    <label htmlFor="recuerdame">Recuérdame</label>
                  </div>

                  <button id="btn-login" type="submit" className="btn-login">
                    Iniciar Sesión
                  </button>
                  <p className="forgot-password">¿Olvidaste la contraseña?</p>
                </form>
              </div>
            </div>

            {/* Derecha: crear cuenta */}
            <div className="login-right">
              <h2>¿Eres nuevo en Nuit Fantome?</h2>
              <p>
                Al registrarte, podrás agilizar tu proceso de compra. Edita tus
                datos, añade varias direcciones, revisa y realiza un seguimiento
                de tus pedidos, ¡y mucho más!
              </p>
              <a href="/register" className="btn-crear-cuenta">
                Crear cuenta
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LoginPage;
