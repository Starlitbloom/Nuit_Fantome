import React from "react";
import "../assets/css/style.css";

function Footer() {
  return (
    <>
      {/* Sección final con imagen, logo, texto y redes sociales */}
      <section className="final-final">
        <img
          src="/assets/img/fondo_footer.png"
          alt="Fondo final"
          className="final-bg"
        />

        <div className="final-contenido">
          {/* Logo a la izquierda */}
          <div className="final-logo">
            <img src="/assets/img/logo.png" alt="Logo Nuit Fantome" />
          </div>

          {/* Texto motivacional al centro */}
          <div className="final-texto">
            <p>
              Te ayudamos a planificar para lograrlo todo con nuestra papelería
              física y digital. Sabías que si tu escritorio tiene colores y te
              gusta, la motivación y la productividad llega por sí sola?
            </p>
          </div>

          {/* Redes sociales a la derecha */}
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

      {/* Footer final */}
      <footer className="footer-final">
        <div className="footer-contenido">
          {/* Texto */}
          <div className="footer-texto">
            © 2025 Nuit Fantome. Todos los derechos reservados.
          </div>

          {/* Métodos de pago */}
          <div className="footer-pagos">
            <img src="/assets/img/webpay.png" alt="Webpay" />
            <img src="/assets/img/transferencia.png" alt="Transferencia bancaria" />
            <img src="/assets/img/mercado_pago.png" alt="Mercado Pago" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
