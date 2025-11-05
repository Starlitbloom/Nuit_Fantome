import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/style4.css"; // tu CSS del registro

export default function RegisterPage() {
  return (
    <>
      <Header />

      <main className="form-container">
        {/* Sección de registro */}
        <section className="register-section">
          <div className="register-box">
            <h2>Crear Cuenta</h2>
            <p>¡Regístrate para disfrutar de nuestros productos y promociones!</p>

            <form id="registerForm" noValidate>
              {/* RUT */}
              <div className="input-container">
                <i className="bi bi-person-badge-fill"></i>
                <input type="text" id="rut" name="rut" placeholder="RUT (sin puntos ni guion)" />
                <span className="error-message" id="rut-error"></span>
              </div>

              {/* Nombre */}
              <div className="input-container">
                <i className="bi bi-person-fill"></i>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
                <span className="error-message" id="nombre-error"></span>
              </div>

              {/* Apellido */}
              <div className="input-container">
                <i className="bi bi-person-fill"></i>
                <input type="text" id="apellido" name="apellido" placeholder="Apellido" />
                <span className="error-message" id="apellido-error"></span>
              </div>

              {/* Correo */}
              <div className="input-container">
                <i className="bi bi-envelope-at-fill"></i>
                <input type="text" id="email" name="email" placeholder="Correo electrónico" />
                <span className="error-message" id="email-error"></span>
              </div>

              {/* Teléfono */}
              <div className="input-container">
                <i className="bi bi-telephone-fill"></i>
                <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" />
                <span className="error-message" id="telefono-error"></span>
              </div>

              {/* Cumpleaños */}
              <div className="input-container">
                <i className="bi bi-calendar-fill"></i>
                <input type="date" id="cumpleanos" name="cumpleanos" />
                <span className="error-message" id="cumpleanos-error"></span>
              </div>

              {/* Región */}
              <div className="input-container select-container">
                <i className="bi bi-geo-alt-fill"></i>
                <select id="region" name="region">
                  <option value="">Selecciona tu región</option>
                </select>
                <span className="error-message" id="region-error"></span>
              </div>

              {/* Comuna */}
              <div className="input-container select-container">
                <i className="bi bi-geo-fill"></i>
                <select id="comuna" name="comuna">
                  <option value="">Selecciona tu comuna</option>
                </select>
                <span className="error-message" id="comuna-error"></span>
              </div>

              {/* Dirección */}
              <div className="input-container">
                <i className="bi bi-house-fill"></i>
                <input type="text" id="direccion" name="direccion" placeholder="Dirección" />
                <span className="error-message" id="direccion-error"></span>
              </div>

              {/* Contraseña */}
              <div className="input-container">
                <i className="bi bi-lock-fill"></i>
                <input type="password" id="password" name="password" placeholder="Contraseña" />
                <button type="button" className="toggle-password">
                  <i className="bi bi-eye-fill"></i>
                </button>
                <span className="error-message" id="password-error"></span>
              </div>

              {/* Confirmar Contraseña */}
              <div className="input-container">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                />
                <button type="button" className="toggle-password">
                  <i className="bi bi-eye-fill"></i>
                </button>
                <span className="error-message" id="confirmPassword-error"></span>
              </div>

              <button type="submit" className="btn-crear">Crear Cuenta</button>

              <p className="login-text">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" style={{ color: "#b48ead" }}>Puedes ingresar aquí</a>
              </p>
            </form>
          </div>
        </section>

        {/* Sección final (igual que en Footer pero incluida acá para mantener diseño) */}
        <section className="final-final">
          <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />

          <div className="final-contenido">
            <div className="final-logo">
              <img src="/assets/img/logo.png" alt="Logo Nuit Fantome" />
            </div>

            <div className="final-texto">
              <p>
                Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital. 
                Sabías que si tu escritorio tiene colores y te gusta, la motivación y la productividad llega por sí sola?
              </p>
            </div>

            <div className="final-redes">
              <div className="siguenos">Síguenos</div>
              <div className="iconos-redes">
                <a href="https://instagram.com">
                  <img src="/assets/img/logo_instagram.png" alt="Instagram" />
                </a>
                <a href="https://facebook.com">
                  <img src="/assets/img/logo_facebook.png" alt="Facebook" />
                </a>
                <a href="mailto:contacto@nuitfantome.com">
                  <img src="/assets/img/logo_gmail.png" alt="Email" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
