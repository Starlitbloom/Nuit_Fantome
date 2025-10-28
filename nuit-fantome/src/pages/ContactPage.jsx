import React from "react";
import "../assets/css/style2.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ContactPage() {
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

      {/* Sección contacto */}
      <main className="contacto">
        <section className="contact-hero">
          <img src="assets/img/fondo_contacto.png" alt="Contacto" className="contact-hero-img" />
          <div className="contact-hero-title">
            <div className="title-box">
              <h1>Ponte en contacto con nosotras</h1>
            </div>
            <div className="subtitle-box">
              <p>Toda nuestra info de contacto está aquí abajo</p>
            </div>
          </div>

          <div className="contact-overlay">
            <h2 className="overlay-title">Contactate con nosotras</h2>
            <p className="overlay-sub">
              Si necesitas ayuda con pedidos, cambios o consultas generales, escríbenos aquí.
            </p>

            <form id="contactForm" className="contact-form" noValidate>
              <label className="label-strong" htmlFor="asunto">Asunto</label>
              <div className="field">
                <select id="asunto">
                  <option value="">Selecciona una opción</option>
                  <option value="estado">Estado de mi pedido</option>
                  <option value="cambio">Quiero hacer un cambio</option>
                  <option value="devolucion">Quiero devolver mi compra</option>
                  <option value="cancelar">Quiero cancelar mi compra</option>
                  <option value="experiencia">Experiencia en tienda</option>
                </select>
              </div>

              <div id="dynamicArea"></div>

              <div className="form-actions">
                <button type="submit" className="btn-enviar">Enviar</button>
              </div>
            </form>
          </div>
        </section>

        <section className="contact-info-wrap container">
          <div className="contact-info-grid">
            <div
              className="contact-card correo"
              style={{ backgroundImage: "url('assets/img/fondo_envio1.png')" }}
            >
              <h3>Correo</h3>
              <p>contacto@nuitfantome.com</p>
            </div>
            <div
              className="contact-card telefono"
              style={{ backgroundImage: "url('assets/img/fondo_envio2.png')" }}
            >
              <h3>Teléfono</h3>
              <p>+56 9 1234 5678</p>
            </div>
            <div
              className="contact-card direccion"
              style={{ backgroundImage: "url('assets/img/fondo_envio3.png')" }}
            >
              <h3>Dirección</h3>
              <p>Santiago, Chile</p>
            </div>
          </div>
        </section>

        <section className="final-final">
          <img src="assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
          <div className="final-contenido">
            <div className="final-logo">
              <img src="assets/img/logo.png" alt="Logo Nuit Fantome" />
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
                  <img src="assets/img/logo_instagram.png" alt="Instagram" />
                </a>
                <a href="https://facebook.com">
                  <img src="assets/img/logo_facebook.png" alt="Facebook" />
                </a>
                <a href="mailto:contacto@nuitfantome.com">
                  <img src="assets/img/logo_gmail.png" alt="Email" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

export default ContactPage;
