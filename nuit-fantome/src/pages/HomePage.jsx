import React from "react";
import "../assets/css/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
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

      <Header />

      <main>
        {/* Slider */}
        <div className="slider">
          <div className="slides">
            <div className="slide active">
              <img src="/assets/img/agendas_p.png" alt="Imagen 1" />
            </div>
            <div className="slide">
              <img src="/assets/img/digital_p.png" alt="Imagen 2" />
            </div>
            <div className="slide">
              <img src="/assets/img/coleccion_p.png" alt="Imagen 3" />
            </div>
          </div>
          <a className="prev">&#10094;</a>
          <a className="next">&#10095;</a>
          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Sección doble imágenes */}
        <section className="doble-imagenes">
          <div className="imagen-container">
            <a href="/productos">
              <img src="/assets/img/libretas.png" alt="Libretas" />
              <div className="overlay"><h3>Libretas</h3></div>
            </a>
          </div>
          <div className="imagen-container">
            <a href="/productos">
              <img src="/assets/img/planners.png" alt="Planners" />
              <div className="overlay"><h3>Planners</h3></div>
            </a>
          </div>
        </section>

        {/* Fondo movimiento */}
        <section className="fondo-movimiento">
          <img src="/assets/img/fondo_papel_alargado.png" alt="Fondo de papel" className="fondo-img" />
          <div className="contenido-fondo">
            <h2>BIENVENIDOS A NUIT FANTOME</h2>
            <p>Nuestra papelería tiene como objetivo no solo ofrecer productos de alta calidad para que la gente pueda plasmar sus ideas y crear proyectos únicos, sino que queremos ser una tienda que fomente la creatividad y la conexión humana a través del arte.</p>
            <a href="/productos" className="btn-comprar">COMPRAR AHORA</a>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="productos-recientes">
          <h2>Productos destacados</h2>
          <div className="grid-productos" id="productos-container"></div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <img src="/assets/img/club.png" alt="Fondo newsletter" className="newsletter-img" />
          <div className="newsletter-contenido">
            <h2>¡Únete a nuestro club!</h2>
            <p>Se parte de nuestra comunidad para que estemos en contacto y podamos compartir la mejor información, tips, sorpresas, descuentos, lanzamientos y más!</p>
            <form className="newsletter-form">
              <div className="input-container">
                <i className="bi bi-envelope-at-fill"></i>
                <input type="email" placeholder="Ingresa tu email" required />
              </div>
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </section>

        {/* Tipos de envío */}
        <section className="envios">
          <h2>Conoce nuestros tipos de envío</h2>
          <p>Estos son los envíos que ofrecemos en nuestra tienda para que tus compras lleguen rápido y seguro.</p>
          <div className="envios-cards">
            <div className="envio-card retiro" style={{ backgroundImage: "url('/assets/img/fondo_envio1.png')" }}>
              <h3>Retiro en tienda</h3>
              <p>Retira tus productos directamente en nuestra tienda física.</p>
            </div>
            <div className="envio-card metropolitana" style={{ backgroundImage: "url('/assets/img/fondo_envio2.png')" }}>
              <h3>Región Metropolitana</h3>
              <p>Envío express y estándar dentro de Santiago.</p>
            </div>
            <div className="envio-card otras" style={{ backgroundImage: "url('/assets/img/fondo_envio3.png')" }}>
              <h3>Otras regiones</h3>
              <p>Envío estándar a todo Chile (Chilexpress y Correos de Chile).</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
